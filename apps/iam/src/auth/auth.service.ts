import type { OtpModel, SessionModel, UserModel } from '@aenode/iam-db/models';
import { EncryptionService } from '@aenode/nest-encrypt';
import { OtpManagerService } from '@aenode/nest-otp';
import { Injectable } from '@aenode/nest/common';
import type { Request } from '@aenode/nest/express';
import { JwtService } from '@aenode/nest/jwt';
import { v7 } from '@aenode/nest/uuid';
import { SessionService, UserService } from '../data/index.js';

@Injectable()
export class AuthService {
  private readonly sessionIdSessionMap = new Map<number, SessionModel>();
  private readonly userIdUserMap = new Map<number, UserModel>();
  private readonly usernameUserIdMap = new Map<string, number>();
  private readonly userIdOtpMap = new Map<number, OtpModel>();
  private readonly userIdRoleMap = new Map<number, Set<string>>();
  private readonly userIdPermissionMap = new Map<number, Set<string>>();

  constructor(
    protected readonly userService: UserService,
    protected readonly sessionService: SessionService,
    protected readonly jwtService: JwtService,
    protected readonly otpManagerService: OtpManagerService,
    protected readonly encryptionService: EncryptionService,
  ) {}

  async createSession(userId: number, req: Request) {
    return await this.sessionService.createOne({
      agent: req.headers['user-agent'] ?? 'unkown',
      deviceUUID: req.headers['x-device-id']?.toString() ?? v7(),
      ipAddress: req.ip ?? '::',
      userId,
    });
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
        otps: true,
        userRoles: { include: { role: true } },
        userPermissions: { include: { permission: true } },
      },
    });

    for (const user of foundUsers) {
      this.userIdUserMap.set(user.id, user);

      // Load otps

      if (user.userPermissions) {
        const permissions = new Set(
          user.userPermissions.map(
            (userPermission) => userPermission.permission.name,
          ),
        );
        this.userIdPermissionMap.set(user.id, permissions);
      }
      if (user.userRoles) {
        const roles = new Set(
          user.userRoles.map((userRole) => userRole.role.name),
        );
        this.userIdRoleMap.set(user.id, roles);
      }
    }
  }
}
