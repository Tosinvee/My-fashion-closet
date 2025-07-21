import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from '../../../utils/mongoose/object-id';
import { Category } from './category.schema';
import { createCleanSchema } from '../../../utils/mongoose/schema.method';
import { User } from '../../user/schema/user.schema';
import { Tag } from './tag.schema';

@Schema()
export class ClosetItem extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  imageUrl: string;

  @Prop({ type: ObjectId, ref: Category.name })
  categoryId: ObjectId;

  @Prop()
  description?: string;

  @Prop({ type: ObjectId, ref: User.name })
  user: User;

  @Prop({ type: [], ref: Tag.name })
  tags: string[];
}
export const ClosetItemSchema = createCleanSchema(ClosetItem);
