import { Injectable, type CanActivate } from '@nestjs/common';
import { PermissionCacheService } from '../services/permission-cache.service.js';
import { RequestService } from '../services/request.service.js';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    protected readonly permissionCache: PermissionCacheService,
    protected readonly requestService: RequestService,
  ) {}
  async canActivate(): Promise<boolean> {
    const session = this.requestService.session;

    if (!session) {
      return false;
    }

    return true;
  }
}
