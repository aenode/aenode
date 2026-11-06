import { Prisma } from '@aenode/iam-db';
import { RoleDelegateService } from '@aenode/iam-db/nest';
import { InjectPrismaDelegate } from '@aenode/nest-prisma';
import { Injectable } from '@aenode/nest/common';

@Injectable()
export class RoleService extends RoleDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Role)
    delegate: Prisma.RoleDelegate,
  ) {
    super(delegate);
  }
}
