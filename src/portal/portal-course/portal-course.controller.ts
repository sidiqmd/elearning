import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PortalCourseService } from './portal-course.service';
import { LogUtilService } from 'src/_common/services/log-util.service';
import { Course } from 'src/_common/mongo-schema/course-schema';
import { PortalError } from 'src/_common/errors/portal.error';

@ApiTags('courses')
@Controller('courses')
export class PortalCourseController {
  constructor(
    private portalCourseService: PortalCourseService,
    private logger: LogUtilService,
  ) {
    this.logger.setContext(PortalCourseController.name);
  }

  @Get()
  @ApiOkResponse({
    type: Course,
    isArray: true,
  })
  @ApiResponse({
    status: PortalError.COMMON.INVALID.statusCode,
    description: PortalError.COMMON.INVALID.message,
  })
  getAllCourse(): Promise<Course[]> {
    this.logger.log('getAllCourse');

    return this.portalCourseService.getAllCourse();
  }

  @Get('search')
  @ApiOkResponse({
    type: Course,
    isArray: true,
  })
  @ApiResponse({
    status: PortalError.COMMON.INVALID.statusCode,
    description: PortalError.COMMON.INVALID.message,
  })
  searchCourse(@Query('query') query: string): Promise<Course[]> {
    this.logger.log('searchCourse', { query });

    return this.portalCourseService.searchCourse(query);
  }
}
