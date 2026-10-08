import type { PermissionRecord } from '@aenode/nest-auth';
import { Injectable } from '@nestjs/common';

/**
 * The service cache the users' permissions by userId
 */
@Injectable()
export class PermissionCacheService {
  protected readonly userIdToPermissions = new Map<number, PermissionRecord>();

  set(userId: number, permissions: PermissionRecord) {
    return this.userIdToPermissions.set(userId, permissions);
  }

  get(userId: number) {
    return this.userIdToPermissions.get(userId);
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
  has(
    userId: number,
    scopeName: string,
    resourceName: string,
    operationName: string,
  ) {
    return (
      this.userIdToPermissions.get(userId)?.[scopeName]?.[resourceName]?.[
        operationName
      ] === true
    );
  }
}
