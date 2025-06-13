import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  constructor(private readonly configService: ConfigService) {
    const service = this.configService.get<string>('MAIL_SERVICE');
    const user = this.configService.get<string>('MAIL_USER');
    const pass = this.configService.get<string>('APP_PASSWORD');
    this.transporter = nodemailer.createTransport({
      service,
      auth: {
        user,
        pass,
      },
    });
  }

  async format(otp: string, content: string) {
    return `<div
      style="
        font-family: 'Raleway', sans-serif;
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f4f4f4;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      "
    >
      <h1 style="font-size: 24px; color: #333; margin-bottom: 10px">
        ${content}
      </h1>
      <p style="font-size: 16px; color: #666; margin-bottom: 20px">
        Kindly use this OTP for Verification.
      </p>
      <h1 style="font-size: 28px; color: #007bff; margin: 20px 0">
        ${otp}
      </h1>
      <p style="font-size: 16px; color: #666">It will expire in 30 minutes</p>
    </div>`;
  }

  async sendOtp(email: string, otp: string): Promise<void> {
    const html = await this.format(otp, 'OTP Verification');
    const mailOptions = {
      from: ` Mobile Mechanic <$user}> `,
      to: email,
      subject: 'OTP Verification',
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to send OTP email');
    }
  }
}
