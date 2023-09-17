import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/_common/mongo-schema/user-schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async createUser(
    username: string,
    hashedPassword: string,
    email: string,
  ): Promise<User> {
    return this.userModel.create({
      username,
      password: hashedPassword,
      email,
    });
  }

  async findAllUser(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async updateUser(user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(user['_id'], user).lean().exec();
  }
}
