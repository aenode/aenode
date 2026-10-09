import {
  getOperationName,
  getResourceName,
  getScopeName,
  isPublic,
  Reflector,
} from '@aenode/nest';
import {
  Injectable,
  Scope,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { AuthCacheService } from '../services/auth-cache.service.js';
import { RequestService } from '../services/request.service.js';

@Injectable({ scope: Scope.REQUEST })
export class PermissionGuard implements CanActivate {
  constructor(
    protected readonly authCache: AuthCacheService,
    protected readonly requestService: RequestService,
    protected readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext) {
    if (isPublic(context, this.reflector)) {
      return true;
    }
    const session = this.requestService.session;

    if (!session) {
      throw new UnauthorizedException('Session not found');
    }

    if (this.authCache.hasRole(session.userId, 'admin')) {
      return true;
    }

    const scopeName = getScopeName(context, this.reflector);
    const resourceName = getResourceName(context, this.reflector);
    const operationName = getOperationName(context, this.reflector);

    const permission = `${scopeName}.${resourceName}.${operationName}`;

    const userHasPermissions = this.authCache.hasPermission(
      session.userId,
      permission,
    );

    if (!userHasPermissions) {
      throw new UnauthorizedException(
        `The user does not have required permission ${scopeName}.${resourceName}.${operationName}`,
      );
    }

    return true;
  }
}
