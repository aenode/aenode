import type {
  LoginDto,
  LoginResponseDto,
  OtpLoginDto,
} from '@aenode/nest-auth';
import { CryptoService } from '@aenode/nest-crypto';
import { InjectPrismaDelegate } from '@aenode/prisma';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { Prisma } from '../../generated/prisma/client.js';

@Injectable()
export class LoginService {
  constructor(
    protected readonly cryptoService: CryptoService,
    @InjectPrismaDelegate(Prisma.ModelName.User)
    protected readonly userService: Prisma.UserDelegate,
    @InjectPrismaDelegate(Prisma.ModelName.Otp)
    protected readonly otpService: Prisma.OtpDelegate,
    @InjectPrismaDelegate(Prisma.ModelName.Session)
    protected readonly sessionService: Prisma.SessionDelegate,
    protected readonly jwtService: JwtService,
  ) {}

  protected async findOtpByUserIdOrThrow(userId: number) {
    const found = await this.otpService.findUnique({
      where: { userId },
    });

    if (found) {
      return found;
    }

    throw new NotFoundException('Otp not found');
  }
  protected async findUserByUsernameOrThrow(username: string) {
    const found = await this.userService.findUnique({ where: { username } });

    if (found) {
      return found;
    }

    throw new UnauthorizedException('User not found');
  }
  protected async createSession(userId: number, req: Request) {
    const userAgent = req.get('user-agent');
    const deviceId = req.headers['x-device-id'] as string | undefined;
    const ipAddress = req.ip;

    const session = await this.sessionService.create({
      data: { userId, userAgent, ipAddress, deviceId },
    });

    const token = await this.jwtService.signAsync({ sub: session.id });

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
}
