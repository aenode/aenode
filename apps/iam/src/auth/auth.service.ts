import { SessionCreateDto } from '@aenode/iam-db/nest';
import { EncryptionService } from '@aenode/nest-encrypt';
import { OtpManagerService } from '@aenode/nest-otp';
import { Injectable, NotFoundException } from '@aenode/nest/common';
import type { Request } from '@aenode/nest/express';
import { JwtService } from '@aenode/nest/jwt';
import { v7 } from '@aenode/nest/uuid';
import { transformAndValidate } from '@aenode/prop';
import { OtpService, SessionService, UserService } from '../data/index.js';
import { AuthUser } from './auth-user.js';
import { MessageResponseDto } from './dtos/message-response.dto.js';

@Injectable()
export class AuthService {
  constructor(
    protected readonly userService: UserService,
    protected readonly sessionService: SessionService,
    protected readonly otpService: OtpService,
    protected readonly jwtService: JwtService,
    protected readonly otpManagerService: OtpManagerService,
    protected readonly encryptionService: EncryptionService,
  ) {}

  async createSession(userId: number, req: Request) {
    const deviceUUID = req.headers['x-device-id']?.toString() ?? v7();
    const ipAddress = req.ip;
    const agent = req.headers['user-agent'];
    const location = req.headers['location'];

    const rawSession = await transformAndValidate(SessionCreateDto, {
      userId,
      agent,
      deviceUUID,
      ipAddress,
      location,
    });

    return await this.sessionService.createOne(rawSession);
  }

  async signToken(sessionId: number) {
    return await this.jwtService.signAsync({ sub: sessionId });
  }

  async verifyToken(token: string): Promise<{ sub: number }> {
    return await this.jwtService.verifyAsync(token);
  }

  async verifyOtp(otp: string, secret: string) {
    return await this.otpManagerService.verifyOtp(otp, secret);
  }

  encrypt(data: string) {
    return this.encryptionService.encrypt(data);
  }

  decrypt(data: string) {
    return this.encryptionService.decrypt(data);
  }

  async enableOtp(otpId: number) {
    return await this.otpService.updateOneById(otpId, { isEnabled: true });
  }

  async deleteSessionBySessionId(sessionId: number) {
    const authUser = AuthUser.findUserBySessionId(sessionId);
    await this.sessionService.softDeleteOneById(sessionId);
    if (authUser) {
      return authUser.deleteSessionBySessionId(sessionId);
    }

    return new MessageResponseDto({ message: 'Bye' });
  }

  async deleteAllSessionsById(sessionId: number) {
    const authUser = AuthUser.findUserBySessionId(sessionId);

    if (!authUser) {
      throw new NotFoundException('Session not found');
    }

    const userId = authUser.user.id;

    await this.sessionService.delegate.updateMany({
      where: { userId },
      data: { isActive: false },
    });

    authUser.deleteAllSessions();

    return new MessageResponseDto({ message: 'Bye' });
  }
}
