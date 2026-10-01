import { InjectPrismaDelegate } from '@aenode/prisma';
import { Injectable } from '@nestjs/common';
import { RoleDelegateService } from '../../generated/dto/role/role.js';
import { Prisma } from '../../generated/prisma/client.js';

@Injectable()
export class RoleService extends RoleDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Role) delegate: Prisma.RoleDelegate,
  ) {
    super(delegate);
  }
}
