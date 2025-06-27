import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }

  @Post('verify-email')
  async verifyEmail(@Body() dto: { email: string; otp: string }) {
    return this.authService.verifyUserOtp(dto.email, dto.otp);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
