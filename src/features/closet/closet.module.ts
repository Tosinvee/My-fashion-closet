import { Module } from '@nestjs/common';
import { ClosetController } from './closet.controller';
import { ClosetService } from './closet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClosetItem, ClosetItemSchema } from './schema/closetItem.schema';
import { User, UserSchema } from '../user/schema/user.schema';
import { Category, CategorySchema } from './schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ClosetItem.name,
        schema: ClosetItemSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [ClosetController],
  providers: [ClosetService],
})
export class ClotheModule {}
