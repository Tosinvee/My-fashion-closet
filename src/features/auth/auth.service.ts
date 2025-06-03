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

export interface TokenPayload {
  userId: string;
  userName: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async signup(body: CreateUserDto) {
    const existinguser = await this.userService.getUser({ email: body.email });
    if (existinguser) {
      throw new BadRequestException('Use with this email already exists');
    }

    const user = await this.userService.create(body);
    return user;
  }

  async verifyUser(email: string, password: string) {
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
      expiresIn: `${this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_MS')}ms`,
    });

    return {
      accessToken,
    };
  }
}
