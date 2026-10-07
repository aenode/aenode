import type { PermissionRecord } from '@aenode/nest-auth';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionCacheService {
  protected readonly userIdToPermissions = new Map<number, PermissionRecord>();

  set(userId: number, permissions: PermissionRecord) {
    return this.userIdToPermissions.set(userId, permissions);
  }

  get(userId: number) {
    return this.userIdToPermissions.get(userId);
  }

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
