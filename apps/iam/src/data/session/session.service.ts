import { InjectPrismaDelegate } from '@aenode/prisma';
import { Injectable } from '@nestjs/common';
import { SessionDelegateService } from '../../generated/dto/session/session.js';
import { Prisma } from '../../generated/prisma/client.js';

@Injectable()
export class SessionService extends SessionDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Session)
    delegate: Prisma.SessionDelegate,
  ) {
    super(delegate);
  }
}
