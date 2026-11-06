import { Prisma } from '@aenode/iam-db';
import { PermissionDelegateService } from '@aenode/iam-db/nest';
import { InjectPrismaDelegate } from '@aenode/nest-prisma';
import { Injectable } from '@aenode/nest/common';

@Injectable()
export class PermissionService extends PermissionDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Permission)
    delegate: Prisma.PermissionDelegate,
  ) {
    super(delegate);
  }
}
