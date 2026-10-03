import { CryptoService } from '@aenode/nest-crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { v7 } from 'uuid';
import { AuthUserService } from './auth-user.service.js';
import type { Enable2FAResponseDto } from './dtos/enable-2fa-response.dto.js';
import type { LoginWithOTPDto } from './dtos/login-with-otp.dto.js';
import type { LoginDto } from './dtos/login.dto.js';
import type { ResetPasswordDto } from './dtos/reset-password.dto.js';

@Injectable()
export class AuthService {
  constructor(
    protected readonly userService: AuthUserService,
    protected readonly jwtService: JwtService,
    protected readonly crytoService: CryptoService,
  ) {}

  protected async signToken(sub: number) {
    const token = await this.jwtService.signAsync({ sub });
    return { token };
  }

  /**
   * Found user by username and verify the password
   * If password is verified, sing a token using
   * @param data
   * @param req
   * @returns
   */
  async login(data: LoginDto, req: Request, deviceId: string | undefined) {
    const found = await this.userService.findByUsernameOrThrow(data.username);

    const isVerified = await this.crytoService.verifyHash(
      found.password,
      data.password,
    );

    if (isVerified) {
      const session = await this.userService.createSession({
        token: '',
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
        deviceId: deviceId ?? v7(),
        userId: found.id,
      });
      const response = await this.signToken(session.id);

      const tokenHash = await this.crytoService.hash(response.token);
      await this.userService.updateSessionTokenById(session.id, tokenHash);
      return response;
    }
    throw new UnauthorizedException('Invalid jwt token');
  }

  async loginWithOTP(
    data: LoginWithOTPDto,
    req: Request,
    deviceId: string | undefined,
  ) {
    const found = await this.userService.findByUsernameOrThrow(data.username);

    const isVerified = await this.crytoService.verifyOtp(
      data.otp,
      found.otpSecret,
    );

    if (isVerified) {
      const session = await this.userService.createSession({
        token: '',
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
        deviceId: deviceId ?? v7(),
        userId: found.id,
      });
      const response = await this.signToken(session.id);

      const tokenHash = await this.crytoService.hash(response.token);
      await this.userService.updateSessionTokenById(session.id, tokenHash);
      return response;
    }

    throw new UnauthorizedException('Invalid OTP');
  }

  async logout(sessionId: number) {
    await this.userService.deleteSessionById(sessionId);
    return { message: `You logout` };
  }

  async logoutAll(userId: number) {
    await this.userService.deactivateAllSessionsByUserId(userId);

    return { message: 'You logout from all sessions' };
  }

  async resetPassword(id: number, data: ResetPasswordDto) {
    return await this.userService.updatePasswordByIdOrThrow(id, data);
  }

  async enable2FA(id: number): Promise<Enable2FAResponseDto> {
    const user = await this.userService.findByIdOrThrow(id);
    const secret = await this.crytoService.generateOtpSecret();
    await this.userService.updateOptSecretByIdOrThrow(id, secret);
    const uri = await this.crytoService.generateOtpUri(secret, user.username);
    const data = await this.crytoService.generateOtpQrCode(uri);
    return { data };
  }

  async disable2FA(id: number) {
    await this.userService.updateOptSecretByIdOrThrow(id, null);
    return { messsage: '2FA disabled' };
  }
}
