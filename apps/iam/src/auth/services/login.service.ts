import type { ExtendedRequest, ResponseMessageDto } from '@aenode/nest';
import {
  EnableOtpDto,
  JwtPayloadDto,
  type LoginDto,
  type LoginResponseDto,
  type OtpLoginDto,
} from '@aenode/nest-auth';
import { CryptoService } from '@aenode/nest-crypto';
import {
  Injectable,
  NotFoundException,
  StreamableFile,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    protected readonly authCacheService: AuthCacheService,
  ) {}

  protected async verifyHash(hashed: string, password: string) {
    return await this.cryptoService.verifyHash(hashed, password);
  }

  protected async verifyOtp(otp: string, secret: string) {
    return await this.cryptoService.verifyOtp(otp, secret);
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

  protected async createSession(userId: number, req: ExtendedRequest) {
    const userAgent = req.get('user-agent');
    const deviceId = (req.headers['x-device-id'] as string) ?? v7();
    const ipAddress = req.ip;

    const session = await this.sessionService.createOne({
      userId,
      userAgent,
      ipAddress,
      deviceId,
    });

    const token = await this.jwtService.signAsync<JwtPayloadDto>({
      sub: session.id,
    });

    this.authCacheService.setUserId(session.id, userId);

    return { ...session, token };
  }

  async login(data: LoginDto, req: ExtendedRequest): Promise<LoginResponseDto> {
    const user = await this.findUserByUsernameOrThrow(data.username);

    if (!this.verifyHash(user.password, data.password)) {
      throw new UnauthorizedException('Wrong password');
    }

    return await this.createSession(user.id, req);
  }

  async loginWithOpt(data: OtpLoginDto, req: ExtendedRequest) {
    const user = await this.findUserByUsernameOrThrow(data.username);
    const otp = await this.findOtpByUserIdOrThrow(user.id);
    const secret = this.cryptoService.decrypt(otp.secret);

    if (!otp.enabled) {
      throw new UnauthorizedException('OTP is not enabled');
    }

    if (!(await this.verifyOtp(data.otp, secret))) {
      throw new UnauthorizedException('Invalid OTP');
    }

    return await this.createSession(user.id, req);
  }

  async create2FA(userId: number) {
    const user = await this.userService.findUniqueOneById(userId);
    if (!user) throw new NotFoundException('User not found');

    const secret = this.cryptoService.generateOtpSecret();
    await this.otpService.upsertOneByUserId({ secret, userId });

    const data = await this.cryptoService.generateOtpQrCodeBuffer(
      await this.cryptoService.generateOtpUri(secret, user.username),
    );
    return new StreamableFile(data);
  }

  async enable2FA(data: EnableOtpDto, userId: number) {
    const otp = await this.otpService.findUniqueOneByUserId(userId);

    if (!otp) {
      throw new NotFoundException('OTP not found');
    }

    const secret = this.cryptoService.decrypt(otp.secret);

    if (!(await this.verifyOtp(data.otp, secret))) {
      throw new UnauthorizedException('Invalid OTP');
    }
    return await this.otpService.updateOneByUserId(userId, { enabled: true });
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
   * @param sessionId
   * @returns
   */
  async logoutAll(sessionId: number): Promise<ResponseMessageDto> {
    const userId = this.authCacheService.userId(sessionId);

    if (!userId)
      throw new UnauthorizedException('Could not find the session owner');

    await this.sessionService.softDeleteManyByUserId(userId);
    return { message: 'Logout from all sessions' };
  }
}
