import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp } from './schema/otp.schema';

@Injectable()
export class OtpService {
  constructor(@InjectModel(Otp.name) private readonly otpModel: Model<Otp>) {}

  async generateOtp(): Promise<{
    otp: string;
    hashedOtp: string;
    expiresAt: Date;
  }> {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    return { otp, hashedOtp, expiresAt };
  }

  async verifyOtp(email: string, submittedOtp): Promise<boolean> {
    const OtpRecord = await this.otpModel.findOne({
      userEmail: email,
      expiresAt: { $gt: new Date() },
    });
    if (!OtpRecord) {
      throw new BadRequestException('Invalid or expired Otp');
    }
    const isValid = await bcrypt.compare(submittedOtp, OtpRecord.otp);
    if (!isValid) {
      throw new BadRequestException('Invalid Otp');
    }
    return true;
  }

  //will implement a cron job later for this
  async cleanExpiredOtp(): Promise<void> {
    const anHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    await this.otpModel.deleteMany({
      expiresAt: { $lt: anHourAgo },
    });
  }
}
