import { Injectable } from '@nestjs/common';
import { UserService } from '../../data/index.js';

/**
 * The service cache the users' permissions by userId
 */
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

    for (const u of users) {
      this.setPermissions(u.id, u.permissions);
      this.setRoles(u.id, u.roles);

      for (const s of u.sessions) {
        this.setUserId(s, u.id);
      }
    }
  }

  userId(sessionId: number) {
    return this.sessionIdUserIdMap.get(sessionId);
  }

  setUserId(sessionId: number, userId: number) {
    this.sessionIdUserIdMap.set(sessionId, userId);
  }

  setRoles(userId: number, roles: Set<string>) {
    this.rolesMap.set(userId, roles);
  }

  roles(userId: number) {
    return this.rolesMap.get(userId);
  }

  setPermissions(userId: number, permissions: Set<string>) {
    this.permissionsMap.set(userId, permissions);
  }

  permissions(userId: number) {
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
