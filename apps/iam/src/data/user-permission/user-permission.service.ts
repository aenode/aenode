import { Prisma } from '@aenode/iam-db';
import { UserPermissionDelegateService } from '@aenode/iam-db/nest';
import { InjectPrismaDelegate } from '@aenode/nest-prisma';
import { Injectable } from '@aenode/nest/common';

@Injectable()
export class UserPermissionService extends UserPermissionDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.UserPermission)
    delegate: Prisma.UserPermissionDelegate,
  ) {
    super(delegate);
  }
}
