import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { createCleanSchema } from '../../../utils/mongoose/schema.method';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  icon: string;

  @Prop()
  description: string;
}
export const CategorySchema = createCleanSchema(Category);
