import { Prisma } from '@aenode/iam-db';
import { PrismaClientModule } from '@aenode/nest-prisma';
import { Module } from '@aenode/nest/common';
import { RolePermissionService } from './role-permission.service.js';

@Module({
  imports: [PrismaClientModule.feature([Prisma.ModelName.RolePermission])],
  providers: [RolePermissionService],
  exports: [RolePermissionService],
})
export class RolePermissionDataModule {}
