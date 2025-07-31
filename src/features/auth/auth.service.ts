import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { User } from '../user/schema/user.schema';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload';
import { OtpService } from '../otp/otp.service';
import { InjectModel } from '@nestjs/mongoose';
import { Otp } from '../otp/schema/otp.schema';
import { Model } from 'mongoose';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
    private mailService: MailService,
    private otpService: OtpService,
    @InjectModel(Otp.name) private readonly otpModel: Model<Otp>,
  ) {}

  async signup(body: CreateUserDto) {
    const existinguser = await this.userService.getUser({ email: body.email });
    if (existinguser) {
      throw new BadRequestException('Use with this email already exists');
    }

    await this.userService.create(body);
    await this.emailVerification(body.email);
    return {
      sucess: true,
      message: 'Otp sent to your email',
    };
  }

  async emailVerification(email: string) {
    const { otp, hashedOtp, expiresAt } = await this.otpService.generateOtp();
    await this.otpModel.deleteMany({ userEmail: email });
    await this.otpModel.create({
      otp: hashedOtp,
      userEmail: email,
      expiresAt,
    });
    await this.mailService.sendOtp(email, otp);
  }

  async verifyUserOtp(email: string, otp: string) {
    const isvalidOtp = await this.otpService.verifyOtp(email, otp);
    if (isvalidOtp) {
      const user = await this.userService.updateUser(
        { email },
        { emailVerified: true },
      );

      const tokenPayload: TokenPayload = {
        userId: user._id.toString(),
        userName: user.userName,
      };
      const accessToken = this.jwtService.sign(tokenPayload, {
        secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: `${this.configService.getOrThrow(
          'JWT_ACCESS_TOKEN_EXPIRATION_MS',
        )}`,
      });

      return {
        success: true,
        message: 'Email verified successfully!',
        accessToken,
      };
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUser({ email });

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Credential not valid');
    }
    return user;
  }

  async login(user: User) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toString(),
      userName: user.userName,
    };
    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION'),
    });

    return {
      accessToken,
    };
  }
}
