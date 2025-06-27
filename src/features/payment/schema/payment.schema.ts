import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../../features/user/schema/user.schema';
import { ObjectId } from '../../../utils/mongoose/object-id';
import { createCleanSchema } from '../../../utils/mongoose/schema.method';

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ type: ObjectId, ref: User.name })
  user: User;

  @Prop()
  email: string;

  @Prop()
  amount: number;

  @Prop()
  transcationId: string;

  @Prop({ default: 'pending' })
  status: 'pending' | 'paid' | 'failed';

  @Prop()
  paidedAt: Date;
}

export const PaymentSchema = createCleanSchema(Payment);
