import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CommonModule } from 'src/_common/common.module';

@Module({
  imports: [CommonModule],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
