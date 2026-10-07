import { InjectPrismaDelegate } from '@aenode/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Role)
    protected readonly roleDelegate: Prisma.RoleDelegate,
  ) {}

  async createScopes() {
    return [];
  }

  async createAdminRole() {
    return await this.roleDelegate.upsert({
      where: { name: 'Admin' },
      create: { name: 'Admin' },
      update: { name: 'Admin' },
    });
  }
}
