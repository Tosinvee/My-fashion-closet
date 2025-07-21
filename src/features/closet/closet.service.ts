import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClosetItem } from './schema/closetItem.schema';
import { Model } from 'mongoose';
import { ClosetItemDto } from './dto/upload-to-closetItem.dto';
import { ObjectId } from '../../utils/mongoose/object-id';
import { User } from '../user/schema/user.schema';
import { Category } from './schema/category.schema';
import { UpdateClosetDto } from './dto/update-closet.dto';

@Injectable()
export class ClosetService {
  constructor(
    @InjectModel(ClosetItem.name) private closetItemModel: Model<ClosetItem>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Category.name) private readonly CategoryModel: Model<Category>,
  ) {}
  async uploadClosetItem(userId: ObjectId, dto: ClosetItemDto) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.closetItemModel.create({
      ...dto,
      userId: user._id,
    });
  }

  async getClosetItem(): Promise<ClosetItem[]> {
    return this.closetItemModel.find().exec();
  }
  async updateClosetItem(id: ObjectId, body: UpdateClosetDto) {
    const updatedCloset = await this.closetItemModel.findByIdAndUpdate(
      id,
      { ...body },
      { new: true },
    );
    if (!updatedCloset) {
      throw new NotFoundException('Closet item not found');
    }
    return updatedCloset;
  }

  async deleteClosetItem(id: ObjectId): Promise<{ message: string }> {
    await this.closetItemModel.findByIdAndDelete(id);
    return {
      message: 'Closet item deleted sucessfully',
    };
  }

  async getCategories(): Promise<Category[]> {
    return this.CategoryModel.find().exec();
  }
}
