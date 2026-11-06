import { Prisma } from '@aenode/iam-db';
import { SessionDelegateService } from '@aenode/iam-db/nest';
import { InjectPrismaDelegate } from '@aenode/nest-prisma';
import { Injectable } from '@aenode/nest/common';

@Injectable()
export class SessionService extends SessionDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Session)
    delegate: Prisma.SessionDelegate,
  ) {
    super(delegate);
  }
}
