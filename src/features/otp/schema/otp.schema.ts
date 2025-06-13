import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Otp {
  @Prop()
  otp: string;

  @Prop()
  userEmail: string;

  @Prop()
  expiresAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
