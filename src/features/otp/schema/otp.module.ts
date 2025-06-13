import { Module } from '@nestjs/common';
import { OtpService } from '../otp.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from '../schema/otp.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }])],
  providers: [OtpService],
  exports: [OtpService, MongooseModule],
})
export class OtpModule {}
