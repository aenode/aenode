import type { JwtPayloadDto } from '@aenode/nest-auth';
import { Injectable, Scope } from '@nestjs/common';

/**
 * The service is for  holding the session information and resource accessability such us public or secured
 * The data should be set during authenticatoin process.
 *
 */
@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  protected __session: JwtPayloadDto;
  protected __isPublic: boolean;

  get isPublic() {
    return !!this.__isPublic;
  }

  set isPublic(isPublic: boolean) {
    this.__isPublic = isPublic;
  }

  get session(): JwtPayloadDto | undefined {
    return this.__session;
  }

  set session(payload: JwtPayloadDto) {
    this.__session = payload;
  }
}
