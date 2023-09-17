import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './_common/schemas/config.schema';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PortalModule } from './portal/portal.module';
import { CommonModule } from './_common/common.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: configValidationSchema,
    }),
    AuthModule,
    UserModule,
    PortalModule,
    CommonModule,
    CourseModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
