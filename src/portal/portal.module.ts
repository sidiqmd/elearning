import { Module } from '@nestjs/common';
import { PortalService } from './portal.service';
import { PortalController } from './portal.controller';
import { PortalUserService } from './portal-user/portal-user.service';
import { PortalUserController } from './portal-user/portal-user.controller';
import { CommonModule } from 'src/_common/common.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { CourseModule } from 'src/course/course.module';
import { PortalCourseController } from './portal-course/portal-course.controller';
import { PortalCourseService } from './portal-course/portal-course.service';

@Module({
  imports: [CommonModule, UserModule, AuthModule, CourseModule],
  providers: [PortalService, PortalUserService, PortalCourseService],
  controllers: [PortalController, PortalUserController, PortalCourseController],
})
export class PortalModule {}
