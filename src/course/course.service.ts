import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseLevel } from 'src/_common/constants/course-level.enum';
import { Course } from 'src/_common/mongo-schema/course-schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
  ) {}

  async findAllCourse(filter: any): Promise<Course[]> {
    // await this.courseModel.create({
    //   title: 'Beginner NodeJs Course',
    //   author: 'John Smith',
    //   image:
    //     'https://www.shutterstock.com/image-photo/node-inscription-against-laptop-code-background-1902674860',
    //   level: CourseLevel.BEGINNER,
    // });
    // await this.courseModel.create({
    //   title: 'Intermediate NodeJs Course',
    //   author: 'John Smith',
    //   image:
    //     'https://www.shutterstock.com/image-photo/node-inscription-against-laptop-code-background-1902674860',
    //   level: CourseLevel.INTERMEDIATE,
    // });
    // await this.courseModel.create({
    //   title: 'Advance NodeJs Course',
    //   author: 'John Smith',
    //   image:
    //     'https://www.shutterstock.com/image-photo/node-inscription-against-laptop-code-background-1902674860',
    //   level: CourseLevel.ADVANCE,
    // });

    // await this.courseModel.create({
    //   title: 'Beginner Python Course',
    //   author: 'John Smith',
    //   image:
    //     'https://www.shutterstock.com/image-photo/python-highlevel-programing-language-application-web-1402830182',
    //   level: CourseLevel.BEGINNER,
    // });
    // await this.courseModel.create({
    //   title: 'Intermediate Python Course',
    //   author: 'John Smith',
    //   image:
    //     'https://www.shutterstock.com/image-photo/python-highlevel-programing-language-application-web-1402830182',
    //   level: CourseLevel.INTERMEDIATE,
    // });
    // await this.courseModel.create({
    //   title: 'Advance Python Course',
    //   author: 'John Smith',
    //   image:
    //     'https://www.shutterstock.com/image-photo/python-highlevel-programing-language-application-web-1402830182',
    //   level: CourseLevel.ADVANCE,
    // });

    return this.courseModel.find(filter).exec();
  }
}
