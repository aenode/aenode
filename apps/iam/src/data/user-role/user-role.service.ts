import { Prisma } from '@aenode/iam-db';
import { UserRoleDelegateService } from '@aenode/iam-db/nest';
import { InjectPrismaDelegate } from '@aenode/nest-prisma';
import { Injectable } from '@aenode/nest/common';

@Injectable()
export class UserRoleService extends UserRoleDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.UserRole)
    delegate: Prisma.UserRoleDelegate,
  ) {
    super(delegate);
  }
}
