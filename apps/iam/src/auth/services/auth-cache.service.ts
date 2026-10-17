import { Injectable } from '@aenode/nest';
import { UserService } from '../../data/index.js';

@Injectable()
export class AuthCacheService {
  protected readonly rolesMap = new Map<
    [userId: number][0],
    [roles: Set<string>][0]
  >();

  protected readonly permissionsMap = new Map<
    [userId: number][0],
    [permissions: Set<string>][0]
  >();

  protected readonly sessionIdUserIdMap = new Map<
    [sessionId: number][0],
    [userId: number][0]
  >();

  constructor(protected readonly userService: UserService) {}

  async loadCache() {
    const users = await this.userService.users();

    for (const user of users) {
      this.setPermissionsByUserId(user.id, user.permissions);
      this.setRolesByUserId(user.id, user.roles);

      for (const sessionId of user.sessions) {
        this.setUserIdBySessionId(sessionId, user.id);
      }
    }
  }

  getUserIdBySessionId(sessionId: number) {
    return this.sessionIdUserIdMap.get(sessionId);
  }

  setUserIdBySessionId(sessionId: number, userId: number) {
    this.sessionIdUserIdMap.set(sessionId, userId);
  }

  deleteSessionBySessionId(sessionId: number) {
    this.sessionIdUserIdMap.delete(sessionId);
  }

  deleteAllSessionsBySessionId(sessionId: number) {
    const userId = this.getUserIdBySessionId(sessionId);

    const sessionEntries = this.sessionIdUserIdMap.entries();
    for (const [__sessionId, __userId] of sessionEntries) {
      if (__userId === userId) {
        this.sessionIdUserIdMap.delete(__sessionId);
      }
    }
  }

  setRolesByUserId(userId: number, roles: Set<string>) {
    this.rolesMap.set(userId, roles);
  }

  roles(userId: number) {
    return this.rolesMap.get(userId);
  }

  setPermissionsByUserId(userId: number, permissions: Set<string>) {
    this.permissionsMap.set(userId, permissions);
  }

  getUserPermissionsByUserId(userId: number) {
    return this.permissionsMap.get(userId);
  }

  /**
   * Check the user has the required permission.
   *
   * @param userId
   * @param scopeName
   * @param resourceName
   * @param operationName
   * @returns
   */
  hasPermission(userId: number, permission: string) {
    return this.permissionsMap.get(userId)?.has(permission);
  }

  /**
   * Check the user has the role
   * @param userId
   * @param role
   * @returns
   */
  hasRole(userId: number, role: string) {
    return this.rolesMap.get(userId)?.has(role);
  }

  isAdmin(userId: number) {
    return this.rolesMap.get(userId)?.has('admin');
  }
}
