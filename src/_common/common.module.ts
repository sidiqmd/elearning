import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LogUtilService } from './services/log-util.service';
import { HashUtilService } from './services/hash-util.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './mongo-schema/user-schema';
import {
  OneTimeToken,
  OneTimeTokenSchema,
} from './mongo-schema/one-time-token.schema';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtUtilService } from './services/jwt-util.service';
import { AccessJwtStrategy } from './strategies/access-jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { Course, CourseSchema } from './mongo-schema/course-schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: OneTimeToken.name, schema: OneTimeTokenSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const options: JwtModuleOptions = {
          secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          signOptions: {
            issuer: 'ELearning',
            expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
          },
        };
        return options;
      },
    }),
  ],
  providers: [
    Logger,
    LogUtilService,
    HashUtilService,
    JwtUtilService,
    AccessJwtStrategy,
    RefreshJwtStrategy,
  ],
  exports: [
    Logger,
    LogUtilService,
    HashUtilService,
    JwtUtilService,
    AccessJwtStrategy,
    RefreshJwtStrategy,
    MongooseModule,
    ConfigModule,
  ],
})
export class CommonModule {}
