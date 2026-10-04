import { InjectPrismaDelegate } from '@aenode/prisma';
import { Injectable } from '@nestjs/common';
import { PermissionDelegateService } from '../../generated/dto/permission/permission.js';
import { Prisma } from '../../generated/prisma/client.js';

@Injectable()
export class PermissionService extends PermissionDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Permission)
    delegate: Prisma.PermissionDelegate,
  ) {
    super(delegate);
  }
}
