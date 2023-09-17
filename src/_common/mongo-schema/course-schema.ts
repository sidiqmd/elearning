import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CourseLevel } from '../constants/course-level.enum';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  image: string;

  @Prop({
    enum: CourseLevel,
  })
  level: CourseLevel;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
