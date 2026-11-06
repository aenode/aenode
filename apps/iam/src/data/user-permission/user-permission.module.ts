import { Prisma } from '@aenode/iam-db';
import { PrismaClientModule } from '@aenode/nest-prisma';
import { Module } from '@aenode/nest/common';
import { UserPermissionService } from './user-permission.service.js';

@Module({
  imports: [PrismaClientModule.feature([Prisma.ModelName.UserPermission])],
  providers: [UserPermissionService],
  exports: [UserPermissionService],
})
export class UserPermissionDataModule {}
