import type { OtpModel, SessionModel, UserModel } from '@aenode/iam-db/models';
import { SessionCreateDto } from '@aenode/iam-db/nest';
import { EncryptionService } from '@aenode/nest-encrypt';
import { OtpManagerService } from '@aenode/nest-otp';
import { Injectable, NotFoundException } from '@aenode/nest/common';
import type { Request } from '@aenode/nest/express';
import { JwtService } from '@aenode/nest/jwt';
import { v7 } from '@aenode/nest/uuid';
import { transformAndValidate } from '@aenode/prop';
import { OtpService, SessionService, UserService } from '../data/index.js';
import { MessageResponseDto } from './dtos/message-response.dto.js';

@Injectable()
export class AuthService {
  private readonly tokenSessionIdMap = new Map<string, number>();
  private readonly sessionIdTokenMap = new Map<number, string>();
  private readonly sessionIdSessionMap = new Map<number, SessionModel>();
  private readonly userIdSessionIdsMap = new Map<number, Set<number>>();
  private readonly userIdUserMap = new Map<number, UserModel>();
  private readonly usernameUserIdMap = new Map<string, number>();
  private readonly userIdOtpMap = new Map<number, OtpModel>();
  private readonly userIdRoleMap = new Map<number, Set<string>>();
  private readonly userIdPermissionMap = new Map<number, Set<string>>();

  constructor(
    protected readonly userService: UserService,
    protected readonly sessionService: SessionService,
    protected readonly otpService: OtpService,
    protected readonly jwtService: JwtService,
    protected readonly otpManagerService: OtpManagerService,
    protected readonly encryptionService: EncryptionService,
  ) {}

  protected clearSessionFromCache(sessionId: number) {
    const session = this.sessionIdSessionMap.get(sessionId);

    const token = this.sessionIdTokenMap.get(sessionId);

    if (token) {
      this.tokenSessionIdMap.delete(token);
    }
    if (session) {
      this.userIdSessionIdsMap.get(session.userId)?.delete(sessionId);
    }
    this.sessionIdSessionMap.delete(sessionId);
  }

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

    const session = await this.sessionService.createOne(rawSession);

    this.sessionIdSessionMap.set(session.id, session);

    return session;
  }

  async signToken(sessionId: number) {
    const token = await this.jwtService.signAsync({ sub: sessionId });
    this.tokenSessionIdMap.set(token, sessionId);
    this.sessionIdTokenMap.set(sessionId, token);
    return token;
  }

  async verifyToken(token: string): Promise<{ sub: number }> {
    const sub = this.tokenSessionIdMap.get(token);
    if (sub) {
      return { sub };
    }
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

  findOtpBySessionId(sessionId: number) {
    const session = this.sessionIdSessionMap.get(sessionId);

    if (session) {
      const otp = this.userIdOtpMap.get(session.userId);
      return otp;
    }
    return;
  }

  findOtpByUsername(username: string) {
    const userId = this.usernameUserIdMap.get(username);

    if (userId) {
      return this.userIdOtpMap.get(userId);
    }

    return undefined;
  }

  findSessionById(sessionId: number) {
    return this.sessionIdSessionMap.get(sessionId);
  }

  findUserByUserId(userId: number) {
    return this.userIdUserMap.get(userId);
  }

  findUserByUsername(username: string) {
    const userId = this.usernameUserIdMap.get(username);

    if (!userId) {
      return;
    }
    return this.findUserByUserId(userId);
  }

  hasPermission(userId: number, requiredPermissions: string[]): boolean {
    const userPermissions = this.userIdPermissionMap.get(userId);
    if (userPermissions) {
      return requiredPermissions.every((permission) =>
        userPermissions.has(permission),
      );
    }
    return false;
  }

  hasRole(userId: number, requiredRoles: string[]): boolean {
    const userRoles = this.userIdRoleMap.get(userId);
    if (userRoles) {
      return requiredRoles.every((role) => userRoles.has(role));
    }
    return false;
  }

  hasSession(sessionId: number): boolean {
    return !!this.findSessionById(sessionId);
  }

  async loadUsers() {
    const foundUsers = await this.userService.delegate.findMany({
      where: { isActive: true },
      include: {
        otp: true,
        sessions: true,
        userRoles: { include: { role: true } },
        userPermissions: { include: { permission: true } },
      },
    });

    for (const user of foundUsers) {
      this.userIdUserMap.set(user.id, user);

      // Load otps
      if (user.otp) {
        this.userIdOtpMap.set(user.id, user.otp);
      }

      // Load sessions

      if (user.sessions) {
        for (const session of user.sessions) {
          this.sessionIdSessionMap.set(session.id, session);
        }

        this.userIdSessionIdsMap.set(
          user.id,
          new Set(user.sessions.map((e) => e.id)),
        );
      }

      // Load permissions

      if (user.userPermissions) {
        const permissions = new Set(
          user.userPermissions.map(
            (userPermission) => userPermission.permission.name,
          ),
        );
        this.userIdPermissionMap.set(user.id, permissions);
      }

      // Load roles

      if (user.userRoles) {
        const roles = new Set(
          user.userRoles.map((userRole) => userRole.role.name),
        );
        this.userIdRoleMap.set(user.id, roles);
      }
    }
  }

  async deleteSessionById(sessionId: number) {
    const response = await this.sessionService.softDeleteOneById(sessionId);

    if (response) {
      return new MessageResponseDto({ message: 'Bye' });
    }
    throw new NotFoundException('Session not found');
  }

  async deleteAllSessionsById(sessionId: number) {
    const foundSession = await this.sessionService.findUniqueOneById(sessionId);

    if (foundSession) {
      const { userId } = foundSession;
      const { count } = await this.sessionService.delegate.updateMany({
        where: { userId, isActive: true },
        data: { isActive: false },
      });

      const cachedSession = this.sessionIdSessionMap.get(sessionId);

      if (cachedSession) {
        const sessionIds = this.userIdSessionIdsMap.get(userId);

        if (sessionIds)
          for (const sid of [...sessionIds]) {
            this.sessionIdSessionMap.delete(sid);
            this.userIdSessionIdsMap.delete(userId);

            const token = this.sessionIdTokenMap.get(sid);

            if (token) {
              this.tokenSessionIdMap.delete(token);
            }
            this.sessionIdTokenMap.delete(sid);
          }
      }
      if (count > 0) {
        return new MessageResponseDto({ message: 'Bye' });
      }
    }
    throw new NotFoundException('Session not found');
  }

  async enableOtp(otpId: number) {
    return await this.otpService.updateOneById(otpId, { isEnabled: true });
  }
}
