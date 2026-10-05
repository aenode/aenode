import type { ResponseMessageDto } from '@aenode/nest';
import type {
  LoginDto,
  LoginResponseDto,
  OtpLoginDto,
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
import { SessionCacheService } from '../session-cache.service.js';

@Injectable()
export class LoginService {
  constructor(
    protected readonly userService: UserService,
    protected readonly otpService: OtpService,
    protected readonly sessionService: SessionService,
    protected readonly jwtService: JwtService,
    protected readonly cryptoService: CryptoService,
    protected readonly sessionCacheService: SessionCacheService,
  ) {}

  protected async findOtpByUserIdOrThrow(userId: number) {
    const found = await this.otpService.findUniqueOneByUserId(userId);
    if (found) {
      return found;
    }

    throw new NotFoundException('Otp not found');
  }

  protected async findUserByUsernameOrThrow(username: string) {
    const found = await this.userService.findUniqueOneByUsername(username);

    if (found) {
      return found;
    }

    throw new UnauthorizedException('User not found');
  }

  protected async createSession(userId: number, req: Request) {
    const userAgent = req.get('user-agent');
    const deviceId = (req.headers['x-device-id'] as string) ?? v7();
    const ipAddress = req.ip;

    const foundSesion =
      await this.sessionService.findFirstOneByDeviceId(deviceId);

    const session =
      foundSesion ??
      (await this.sessionService.createOne({
        userId,
        userAgent,
        ipAddress,
        deviceId,
      }));

    const token = await this.jwtService.signAsync({ sub: session.id });

    this.sessionCacheService.add(session.id, userId);

    return { token, deviceId: session.deviceId };
  }

  async login(data: LoginDto, req: Request): Promise<LoginResponseDto> {
    const found = await this.findUserByUsernameOrThrow(data.username);
    const isHashVerified = await this.cryptoService.verifyHash(
      found.password,
      data.password,
    );

    if (isHashVerified) {
      return await this.createSession(found.id, req);
    }

    throw new UnauthorizedException('Wrong password');
  }

  async loginWithOpt(data: OtpLoginDto, req: Request) {
    const foundUser = await this.findUserByUsernameOrThrow(data.username);
    const foundOtp = await this.findOtpByUserIdOrThrow(foundUser.id);

    const isOtpVerified = await this.cryptoService.verifyOtp(
      data.otp,
      foundOtp.secret,
    );

    if (isOtpVerified) {
      return await this.createSession(foundUser.id, req);
    }

    throw new UnauthorizedException('Invalid otp');
  }

  async logout(sessionId: number): Promise<ResponseMessageDto> {
    await this.sessionService.softDeleteOneById(sessionId);

    this.sessionCacheService.remove(sessionId);

    return { message: 'bye' };
  }

  async logoutAll(userId: number): Promise<ResponseMessageDto> {
    await this.sessionService.softDeleteManyByUserId(userId);
    this.sessionCacheService.removeAll(userId);
    return { message: 'bye' };
  }
}
