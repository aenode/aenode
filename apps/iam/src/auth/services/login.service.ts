import type { ResponseMessageDto } from '@aenode/nest';
import {
  JwtPayloadDto,
  type LoginDto,
  type LoginResponseDto,
  type OtpLoginDto,
} from '@aenode/nest-auth';
import { CryptoService } from '@aenode/nest-crypto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { v7 } from 'uuid';
import { OtpService, SessionService, UserService } from '../../data/index.js';
import { AuthCacheService } from './auth-cache.service.js';

@Injectable()
export class LoginService {
  constructor(
    protected readonly userService: UserService,
    protected readonly otpService: OtpService,
    protected readonly sessionService: SessionService,
    protected readonly jwtService: JwtService,
    protected readonly cryptoService: CryptoService,
    protected readonly permissionCacheService: AuthCacheService,
  ) {}

  async login(data: LoginDto, req: Request): Promise<LoginResponseDto> {
    const user = await this.findUserByUsernameOrThrow(data.username);
    const isVerified = await this.cryptoService.verifyHash(
      user.password,
      data.password,
    );

    if (!isVerified) {
      throw new UnauthorizedException('Wrong password');
    }

    return await this.createSession(user.id, req);
  }

  async loginWithOpt(data: OtpLoginDto, req: Request) {
    const user = await this.findUserByUsernameOrThrow(data.username);
    const otp = await this.findOtpByUserIdOrThrow(user.id);

    const isVerified = await this.cryptoService.verifyOtp(data.otp, otp.secret);

    if (!isVerified) {
      throw new UnauthorizedException('Invalid OTP');
    }

    return await this.createSession(user.id, req);
  }

  /**
   * Logout from the current session.
   *
   * @param userId
   * @returns
   */
  async logout(userId: number): Promise<ResponseMessageDto> {
    await this.sessionService.softDeleteOneById(userId);
    return { message: 'Logout from the current session' };
  }

  /**
   * Logout from all sessions
   *
   * @param userId
   * @returns
   */
  async logoutAll(userId: number): Promise<ResponseMessageDto> {
    await this.sessionService.softDeleteManyByUserId(userId);
    return { message: 'Logout from all sessions' };
  }

  protected async findOtpByUserIdOrThrow(userId: number) {
    const found = await this.otpService.findUniqueOneByUserId(userId);

    if (!found) {
      throw new NotFoundException('OTP not found');
    }

    return found;
  }

  protected async findUserByUsernameOrThrow(username: string) {
    const found = await this.userService.findUniqueOneByUsername(username);

    if (!found) {
      throw new UnauthorizedException('User not found');
    }

    return found;
  }

  protected async createSession(userId: number, req: Request) {
    const userAgent = req.get('user-agent');
    const deviceId = (req.headers['x-device-id'] as string) ?? v7();
    const ipAddress = req.ip;

    const session =
      (await this.sessionService.findFirstOneByDeviceId(deviceId)) ??
      (await this.sessionService.createOne({
        userId,
        userAgent,
        ipAddress,
        deviceId,
      }));

    const token = await this.jwtService.signAsync<JwtPayloadDto>({
      sessionId: session.id,
      userId,
      deviceId,
      userAgent,
    });

    return { ...session, token };
  }
}
