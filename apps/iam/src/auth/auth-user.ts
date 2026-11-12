import { type Prisma } from '@aenode/iam-db';
import type { OtpModel, SessionModel } from '@aenode/iam-db/models';
import { type ReadonlyDeep } from '@aenode/types';

export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    otp: true;
    sessions: true;
    userPermissions: { include: { permission: true } };
    userRoles: { include: { role: true } };
  };
}>;

export class AuthUser {
  protected static readonly userIdUserMap = new Map<number, AuthUser>();
  protected static readonly sessionIdUserIdMap = new Map<number, number>();
  protected static readonly usernameUserIdMap = new Map<string, number>();

  protected readonly id: number;
  protected readonly isActive: boolean;
  protected readonly username: string;
  protected readonly password: string;
  protected readonly roles: Set<string>;
  protected readonly permissions: Set<string>;
  protected readonly otp?: OtpModel;
  protected readonly sessionIdSessionMap: Map<
    number,
    ReadonlyDeep<SessionModel>
  > = new Map<number, ReadonlyDeep<SessionModel>>();

  public get user() {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
    };
  }

  protected readonly tokenSessionIdMap: Map<string, number>;

  constructor(protected readonly data: UserWithRelations) {
    this.id = data.id;
    this.isActive = data.isActive;
    this.username = data.username;
    this.password = data.password;

    this.roles = new Set(data.userRoles.map((e) => e.role.name));
    this.permissions = new Set(
      data.userPermissions.map((e) => e.permission.name),
    );

    this.otp = data.otp ?? undefined;

    for (const session of data.sessions) {
      this.sessionIdSessionMap.set(session.id, session);
    }
  }

  protected static mapUserByUserId(userId: number, data: AuthUser) {
    this.userIdUserMap.set(userId, data);
  }

  protected static mapUserIdByUsername(username: string, userId: number) {
    this.usernameUserIdMap.set(username, userId);
  }

  protected static mapUserIdBySessionId(sessionId: number, userId: number) {
    this.sessionIdUserIdMap.set(sessionId, userId);
  }

  public static findOtpBySessionId(sessionId: number): OtpModel | undefined {
    const userId = this.sessionIdUserIdMap.get(sessionId);

    if (userId) {
      const foundUser = this.userIdUserMap.get(userId);

      if (foundUser) {
        return foundUser.otp;
      }
    }

    return;
  }

  public static findOtpByUsername(username: string): OtpModel | undefined {
    const userId = this.usernameUserIdMap.get(username);

    if (userId) {
      const foundUser = this.userIdUserMap.get(userId);

      if (foundUser) {
        return foundUser.otp;
      }
    }

    return;
  }

  public static findUserBySessionId(sessionId: number): AuthUser | undefined {
    const userId = this.sessionIdUserIdMap.get(sessionId);

    if (userId) {
      return this.userIdUserMap.get(userId);
    }
    return;
  }

  public static findUserByUsername(username: string) {
    const userId = AuthUser.usernameUserIdMap.get(username);

    if (userId) {
      return this.userIdUserMap.get(userId);
    }

    return;
  }

  static loadUsers(...users: UserWithRelations[]) {
    for (const u of users) {
      AuthUser.userIdUserMap.set(u.id, new AuthUser(u));
      AuthUser.usernameUserIdMap.set(u.username, u.id);
    }
  }

  static loadSessions(...sessions: [sessionId: number, userId: number][]) {
    for (const s of sessions) {
      AuthUser.sessionIdUserIdMap.set(s[0], s[1]);
    }
  }

  findSessionBySessionId(sessionId: number): SessionModel | undefined {
    return this.sessionIdSessionMap.get(sessionId);
  }

  hasRoles(...roles: string[]): boolean {
    return roles.every((role) => this.roles.has(role));
  }

  hasPermissions(...permissions: string[]): boolean {
    return permissions.every((permission) => this.permissions.has(permission));
  }

  deleteSessionBySessionId(sessionId: number) {
    this.sessionIdSessionMap.delete(sessionId);
  }

  deleteAllSessions() {
    this.sessionIdSessionMap.clear();
  }
}
