import { Prisma } from '@aenode/iam-db';
import { UserDelegateService } from '@aenode/iam-db/nest';
import { InjectPrismaDelegate } from '@aenode/nest-prisma';
import { Injectable } from '@aenode/nest/common';

@Injectable()
export class UserService extends UserDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.User)
    delegate: Prisma.UserDelegate,
  ) {
    super(delegate);
  }
}
