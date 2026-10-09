import { Injectable } from '@nestjs/common';

/**
 * The service cache the users' permissions by userId
 */
@Injectable()
export class AuthCacheService {
  protected readonly rolesMap = new Map<number, Set<string>>();
  protected readonly permissionsMap = new Map<number, Set<string>>();

  setRoles(userId: number, roles: Set<string>) {
    this.rolesMap.set(userId, roles);
  }

  getRoles(userId: number) {
    return this.rolesMap.get(userId);
  }

  setPermissions(userId: number, permissions: Set<string>) {
    return this.permissionsMap.set(userId, permissions);
  }

  getPermissions(userId: number) {
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
}
