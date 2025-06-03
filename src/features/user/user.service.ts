import { Injectable } from '@nestjs/common';
//import * as bcrypt from 'bcryptjs';
import { hash } from 'bcryptjs';

import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(data: Partial<User>) {
    return await new this.userModel({
      ...data,
      password: await hash(data.password, 10),
    }).save();
  }

  async getUser(query: FilterQuery<User>) {
    const user = await this.userModel.findOne(query);
    if (!user) {
      return null;
    }
    return user;
  }

  async updateUser(query: FilterQuery<User>, data: UpdateQuery<User>) {
    return this.userModel.findOneAndUpdate(query, data);
  }
}
