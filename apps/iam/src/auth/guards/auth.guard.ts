import { isPublic, Reflector } from '@aenode/nest';
import { JwtPayloadDto } from '@aenode/nest-auth';
import {
  Injectable,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { RequestService } from '../services/request.service.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly jwtService: JwtService,
    protected readonly requestService: RequestService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    if (isPublic(context, this.reflector)) {
      return (this.requestService.isPublic = true);
    }

    const token = this.extractTokenFromHeader(req);

    try {
      this.requestService.session =
        await this.jwtService.verifyAsync<JwtPayloadDto>(token);
    } catch {
      return false;
    }
    return true;
  }

  private extractTokenFromHeader(req: Request): string {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Autorization header is missing');
    }

    const [name, token] = authorization.split(' ').slice(0, 1);

    if (name === 'Bearer') {
      if (!token) {
        throw new UnauthorizedException('Token is not provided');
      }
      return token;
    }

    throw new UnauthorizedException('Bearer token is required');
  }
}
