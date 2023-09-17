import { Injectable } from '@nestjs/common';
import { Course } from 'src/_common/mongo-schema/course-schema';
import { LogUtilService } from 'src/_common/services/log-util.service';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class PortalCourseService {
  constructor(
    private courseService: CourseService,
    private logger: LogUtilService,
  ) {
    this.logger.setContext(PortalCourseService.name);
  }

  async getAllCourse(): Promise<Course[]> {
    this.logger.log('getAllCourse');

    return this.courseService.findAllCourse(null);
  }

  async searchCourse(query: string): Promise<Course[]> {
    this.logger.log('searchCourse');

    const filter = {
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
      ],
    };

    return this.courseService.findAllCourse(filter);
  }
}
