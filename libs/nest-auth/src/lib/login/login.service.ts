import type { HashService } from '@aenode/nest-hash';
import { Injectable, UnauthorizedException } from '@aenode/nest/common';
import { EventEmitter2 } from '@aenode/nest/emitter';
import type { JwtService } from '@aenode/nest/jwt';
import type { UserJwtData } from '@aenode/types';
import { LoginResponseDto } from '../dtos/login-response-dto.js';
import type { MessageDto } from '../dtos/message-dto.js';
import { UserService } from '../user/user.service.js';
import { LoginDto, LoginWithOtpDto } from './login.dto.js';

@Injectable()
export class LoginService {
  constructor(
    protected readonly hashService: HashService,
    protected readonly jwtService: JwtService,
    protected readonly userService: UserService,
    protected readonly eventService: EventEmitter2,
  ) {}

  async login(data: LoginDto): Promise<LoginResponseDto> {
    const foundUser = this.userService.findByUsername(data.username);

    if (foundUser === undefined) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordVerified = await this.hashService.verifyPassword(
      foundUser.password,
      data.password,
    );

    if (!isPasswordVerified) {
      throw new UnauthorizedException('Wrong password');
    }

    const token = await this.jwtService.signAsync<UserJwtData>({
      sub: foundUser.id,
    });

    return { token };
  }

  loginWithOtp(_data: LoginWithOtpDto): LoginResponseDto {
    return { token: '' };
  }

  logout(_userId: number): MessageDto {
    return { message: _userId.toString() };
  }
}
