import { HashService } from '@aenode/nest-hash';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@aenode/nest/common';
import type { Request } from '@aenode/nest/express';
import { JwtService } from '@aenode/nest/jwt';
import { AuthUser } from '../auth-user.js';
import { AuthService } from '../auth.service.js';
import { EnableOtpDto } from '../dtos/enable-otp.dto.js';
import { LoginResponseDto } from '../dtos/login-response.dto.js';
import { LoginWithOtpDto } from '../dtos/login-with-otp.dto.js';
import { LoginDto } from '../dtos/login.dto.js';

@Injectable()
export class LoginService {
  constructor(
    protected readonly authService: AuthService,
    protected readonly hashService: HashService,
    protected readonly jwtService: JwtService,
  ) {}

  protected async createAndSignSession(userId: number, req: Request) {
    const session = await this.authService.createSession(userId, req);
    const { id: sessionId, deviceUUID } = session;
    const token = await this.authService.signToken(sessionId);

    AuthUser.loadSessions(...[[sessionId, userId] as [number, number]]);
    return new LoginResponseDto({ token, deviceUUID });
  }

  async login(data: LoginDto, req: Request): Promise<LoginResponseDto> {
    const authUser = AuthUser.findUserByUsername(data.username);

    if (!authUser) {
      throw new NotFoundException('User not found');
    }

    const { id: userId, password: hashedPassword } = authUser.user;
    const { password: rawPassword } = data;

    const isPasswordCorrect = await this.hashService.verifyPassword(
      hashedPassword,
      rawPassword,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('Wrong password');
    }

    return await this.createAndSignSession(userId, req);
  }

  async loginWithOtp(
    data: LoginWithOtpDto,
    req: Request,
  ): Promise<LoginResponseDto> {
    const foundOtp = AuthUser.findOtpByUsername(data.username);

    if (foundOtp && foundOtp.isEnabled === true) {
      const { userId } = foundOtp;
      const secret = this.authService.decrypt(foundOtp.secret);

      const isOtpVerified = await this.authService.verifyOtp(data.otp, secret);
      if (isOtpVerified === true) {
        return await this.createAndSignSession(userId, req);
      }
      throw new BadRequestException('Invalid otp');
    }
    throw new NotFoundException('Otp not found');
  }

  logout(sessionId: number) {
    return this.authService.deleteSessionBySessionId(sessionId);
  }

  logoutAll(sessionId: number) {
    return this.authService.deleteAllSessionsById(sessionId);
  }

  async enable2FA(data: EnableOtpDto, sessionId: number) {
    const foundOtp = AuthUser.findOtpBySessionId(sessionId);

    if (!foundOtp) {
      throw new NotFoundException('Otp not found');
    }
    const secret = await this.authService.decrypt(foundOtp.secret);

    const isOtpVerified = await this.authService.verifyOtp(data.otp, secret);

    if (isOtpVerified) {
      return await this.authService.enableOtp(foundOtp.id);
    }

    throw new BadRequestException('Invalid otp');
  }
}
