import { Prisma } from '@aenode/iam-db';
import { RolePermissionDelegateService } from '@aenode/iam-db/nest';
import { InjectPrismaDelegate } from '@aenode/nest-prisma';
import { Injectable } from '@aenode/nest/common';

@Injectable()
export class RolePermissionService extends RolePermissionDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.RolePermission)
    delegate: Prisma.RolePermissionDelegate,
  ) {
    super(delegate);
  }
}
