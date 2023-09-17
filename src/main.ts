import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PortalModule } from './portal/portal.module';

const SWAGGER_ENVS = ['local', 'dev', 'staging'];

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  const prefix = configService.get('APP_GLOBAL_PREFIX');
  app.setGlobalPrefix(prefix);

  const swaggerPrefix = `${prefix}/docs`;
  if (SWAGGER_ENVS.includes(configService.get('STAGE'))) {
    app.use(
      [`/${swaggerPrefix}`, `/${swaggerPrefix}-json`],
      basicAuth({
        challenge: true,
        users: {
          [configService.get('SWAGGER_USER')]:
            configService.get('SWAGGER_PASSWORD'),
        },
      }),
    );

    const configPortal = new DocumentBuilder()
      .setTitle('Portal API')
      .setDescription('E-Learning Backend service for portal')
      .setVersion('1.0')
      .addTag('portal')
      .addBearerAuth(
        {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'Please enter Access Token here.',
          bearerFormat: '',
        },
        'access-token',
      )
      .addBearerAuth(
        {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'Please enter Refresh Token here.',
          bearerFormat: '',
        },
        'refresh-token',
      )
      .build();
    const documentPartner = SwaggerModule.createDocument(app, configPortal, {
      include: [PortalModule],
      ignoreGlobalPrefix: false,
    });

    SwaggerModule.setup(swaggerPrefix, app, documentPartner);

    logger.log(`Swagger UI is available on ${swaggerPrefix}`);
  }

  const port = configService.get('PORT');
  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
