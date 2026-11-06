import { Prisma } from '@aenode/iam-db';
import { PrismaClientModule } from '@aenode/nest-prisma';
import { Module } from '@aenode/nest/common';
import { RoleService } from './role.service.js';

@Module({
  imports: [PrismaClientModule.feature([Prisma.ModelName.Role])],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleDataModule {}
