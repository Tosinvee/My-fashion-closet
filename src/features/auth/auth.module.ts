import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/user.schema';
import { MailService } from '../mail/mail.service';
import { OtpService } from '../otp/otp.service';
import { Otp, OtpSchema } from '../otp/schema/otp.schema';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Otp.name,
        schema: OtpSchema,
      },
    ]),

    PassportModule,
    JwtModule,
    forwardRef(() => UserModule),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    MailService,
    OtpService,
    LocalStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
