import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { createCleanSchema } from '../../../utils/mongoose/schema.method';

@Schema()
export class Tag extends Document {
  @Prop({ required: true, unique: true })
  name: string;
}

export const TagSchema = createCleanSchema(Tag);
