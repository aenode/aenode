import {
  getOperationName,
  getResourceName,
  getScopeName,
  Reflector,
} from '@aenode/nest';
import {
  Injectable,
  UnauthorizedException,
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

  canActivate(context: ExecutionContext) {
    const session = this.requestService.session;

    if (!session) {
      throw new UnauthorizedException('Session not found');
    }

    const scopeName = getScopeName(context, this.reflector);
    const resourceName = getResourceName(context, this.reflector);
    const operationName = getOperationName(context, this.reflector);

    const userHasPermissions = this.permissionCache.has(
      session.userId,
      scopeName,
      resourceName,
      operationName,
    );

    if (!userHasPermissions) {
      throw new UnauthorizedException(
        `The user does not have required permission ${scopeName}.${resourceName}.${operationName}`,
      );
    }

    return true;
  }
}
