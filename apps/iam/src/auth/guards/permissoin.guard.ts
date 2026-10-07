import {
  getOperationName,
  getResourceName,
  getScopeName,
  Reflector,
} from '@aenode/nest';
import {
  Injectable,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { PermissionCacheService } from '../services/permission-cache.service.js';
import { RequestService } from '../services/request.service.js';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    protected readonly permissionCache: PermissionCacheService,
    protected readonly requestService: RequestService,
    protected readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const session = this.requestService.session;

    if (!session) {
      return false;
    }

    const permissions = this.permissionCache.get(session.userId);

    if (!permissions) {
      return false;
    }

    const scopeName = getScopeName(context, this.reflector);
    const resourceName = getResourceName(context, this.reflector);
    const operationName = getOperationName(context, this.reflector);

    return this.permissionCache.has(
      session.userId,
      scopeName,
      resourceName,
      operationName,
    );
  }
}
