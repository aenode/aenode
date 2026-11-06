import { Prisma } from '@aenode/iam-db';
import { PrismaClientModule } from '@aenode/nest-prisma';
import { Module } from '@aenode/nest/common';
import { UserRoleService } from './user-role.service.js';

@Module({
  imports: [PrismaClientModule.feature([Prisma.ModelName.UserRole])],
  providers: [UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleDataModule {}
