import { HashService } from '@aenode/nest-hash';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@aenode/nest/common';
import type { Request } from '@aenode/nest/express';
import { JwtService } from '@aenode/nest/jwt';
import { AuthService } from '../auth.service.js';
import { LoginWithOtpDto } from '../dtos/login-with-otp.dto.js';
import { LoginDto } from '../dtos/login.dto.js';

@Injectable()
export class LoginService {
  constructor(
    protected readonly authService: AuthService,
    protected readonly hashService: HashService,
    protected readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto, req: Request) {
    const foundUser = this.authService.findUserByUsername(data.username);

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    if (
      !(await this.hashService.verifyPassword(
        foundUser.password,
        data.password,
      ))
    ) {
      throw new BadRequestException('Wrong password');
    }

    const session = await this.authService.createSession(foundUser.id, req);
    const token = await this.authService.signToken(session.id);
    return { token };
  }

  async loginWithOtp(data: LoginWithOtpDto, req: Request) {
    const foundOtp = this.authService.findOtpByUsername(data.username);

    if (foundOtp && foundOtp.isEnabled === true) {
      const secret = this.authService.decrypt(foundOtp.secret);

      const isOtpVerified = await this.authService.verifyOtp(data.otp, secret);
      if (isOtpVerified === true) {
        const session = await this.authService.createSession(
          foundOtp.userId,
          req,
        );

        const token = await this.authService.signToken(session.id);

        return { token };
      }
      throw new BadRequestException('Invalid otp');
    }
    throw new NotFoundException('Otp not found');
  }
}
