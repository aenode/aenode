import type { JwtPayloadDto } from '@aenode/nest-auth';
import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  protected __session: JwtPayloadDto;

  public get session() {
    if (!this.__session) {
      throw new UnauthorizedException('Session is not defined');
    }

    return this.__session;
  }

  public set session(payload: JwtPayloadDto) {
    this.__session = payload;
  }
}
