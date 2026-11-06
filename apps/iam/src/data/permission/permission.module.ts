import { Prisma } from '@aenode/iam-db';
import { PrismaClientModule } from '@aenode/nest-prisma';
import { Module } from '@aenode/nest/common';
import { PermissionService } from './permission.service.js';

@Module({
  imports: [PrismaClientModule.feature([Prisma.ModelName.Permission])],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionDataModule {}
