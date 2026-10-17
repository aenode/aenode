import type { ExtendedRequest, ResponseMessageDto } from '@aenode/nest';
import {
  Injectable,
  NotFoundException,
  StreamableFile,
  UnauthorizedException,
} from '@aenode/nest';
import {
  EnableOtpDto,
  JwtPayloadDto,
  type LoginDto,
  type LoginResponseDto,
  type OtpLoginDto,
} from '@aenode/nest-auth';
import { CryptoService } from '@aenode/nest-crypto';
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

  protected async verifyHashOrThrow(hashed: string, password: string) {
    if (await this.cryptoService.verifyHash(hashed, password)) {
      return true;
    }

    throw new UnauthorizedException('Invalid password');
  }

  protected async verifyOtpOrThrow(otp: string, secret: string) {
    if (await this.cryptoService.verifyOtp(otp, secret)) {
      return true;
    }

    throw new UnauthorizedException('Invalid otp');
  }

  protected async findOtpByUsernameOrThrow(username: string) {
    const found = await this.otpService.findUniqueOneByUsername(username);

    if (!found) {
      throw new NotFoundException('OTP not found');
    }

    return found;
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

  protected async findUserByUserIdOrThrow(userId: number) {
    const found = await this.userService.findUniqueOneById(userId);

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

    this.authCacheService.setUserIdBySessionId(session.id, userId);

    return { ...session, token };
  }

  async login(data: LoginDto, req: ExtendedRequest): Promise<LoginResponseDto> {
    const user = await this.findUserByUsernameOrThrow(data.username);
    await this.verifyHashOrThrow(user.password, data.password);
    return await this.createSession(user.id, req);
  }

  async loginWithOpt(data: OtpLoginDto, req: ExtendedRequest) {
    const otp = await this.findOtpByUsernameOrThrow(data.username);
    const secret = this.cryptoService.decrypt(otp.secret);
    await this.verifyOtpOrThrow(data.otp, secret);
    return await this.createSession(otp.userId, req);
  }

  async create2FA(userId: number) {
    const user = await this.findUserByUserIdOrThrow(userId);
    const secret = this.cryptoService.generateOtpSecret();
    await this.otpService.upsertOneByUserId({ secret, userId });

    const uri = await this.cryptoService.generateOtpUri(secret, user.username);
    const data = await this.cryptoService.generateOtpQrCodeBuffer(uri);

    return new StreamableFile(data);
  }

  async enable2FA(data: EnableOtpDto, userId: number) {
    const otp = await this.findOtpByUserIdOrThrow(userId);
    const secret = this.cryptoService.decrypt(otp.secret);
    await this.verifyOtpOrThrow(data.otp, secret);
    return await this.otpService.enableOtpByUserId(userId);
  }

  /**
   * Logout from the current session.
   *
   * @param userId
   * @returns
   */
  async logout(sessionId: number): Promise<ResponseMessageDto> {
    await this.sessionService.softDeleteOneById(sessionId);
    this.authCacheService.deleteSessionBySessionId(sessionId);
    return { message: 'Logout from the current session' };
  }

  /**
   * Logout from all sessions
   *
   * @param sessionId
   * @returns
   */
  async logoutAll(sessionId: number): Promise<ResponseMessageDto> {
    const userId = this.authCacheService.getUserIdBySessionId(sessionId);
    if (!userId)
      throw new UnauthorizedException('Could not find the session owner');

    this.authCacheService.deleteAllSessionsBySessionId(sessionId);
    await this.sessionService.softDeleteManyByUserId(userId);

    return { message: 'Logout from all sessions' };
  }
}
