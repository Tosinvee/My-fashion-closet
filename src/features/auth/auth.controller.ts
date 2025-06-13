import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { CurrentUser } from './decorator/current-user';
import { User } from '../user/schema/user.schema';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(body: CreateUserDto) {
    return this.authService.signup(body);
  }

  @Post('verify-email')
  async verifyEmail(email: string, otp: string) {
    return this.authService.verifyUserOtp(email, otp);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: User) {
    return this.authService.login(user);
  }
}
