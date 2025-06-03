import { Prop, Schema } from '@nestjs/mongoose';
import { createCleanSchema } from 'src/utils/mongoose/schema.method';
import { Document } from 'mongoose';
@Schema()
export class User extends Document {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  userName: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop()
  gender: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  accessToken: string;

  @Prop()
  refreshToken: string;

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  profilePicUri: string;
}

export const UserSchema = createCleanSchema(User);
