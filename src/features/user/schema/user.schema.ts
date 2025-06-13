import { Prop, Schema } from '@nestjs/mongoose';
import { createCleanSchema } from 'src/utils/mongoose/schema.method';
import { Document } from 'mongoose';

export enum OTPMethod {
  PhoneNumber = ' Phone_number',
  Email = 'email',
}
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

  @Prop({
    default: OTPMethod.Email,
    enum: Object.values(OTPMethod),
    type: String,
  })
  otpMethod: string;
}

export const UserSchema = createCleanSchema(User);
