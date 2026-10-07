import { InjectPrismaDelegate } from '@aenode/prisma';
import { Injectable } from '@nestjs/common';
import { UserRoleDelegateService } from '../../generated/dto/user-role/user-role.js';
import { Prisma } from '../../generated/prisma/client.js';

@Injectable()
export class UserRoleService extends UserRoleDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.UserRole)
    delegate: Prisma.UserRoleDelegate,
  ) {
    super(delegate);
  }
}
