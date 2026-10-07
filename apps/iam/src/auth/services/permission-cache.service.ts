import type { PermissionRecord } from '@aenode/nest-auth';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class PermissionCacheService {
  protected readonly permissions = new Map<number, PermissionRecord>();

  set(userId: number, permissions: PermissionRecord) {
    return this.permissions.set(userId, permissions);
  }

  isDefined(userId: number) {
    return !!this.permissions.get(userId);
  }

  get(userId: number) {
    const permissions = this.permissions.get(userId);

    if (!permissions) {
      throw new UnauthorizedException(`No cached permissions for ${userId}`);
    }

    return permissions;
  }
}
