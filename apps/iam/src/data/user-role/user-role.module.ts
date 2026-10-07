import { PrismaModule } from '@aenode/prisma';
import { Module } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { UserRoleService } from './user-role.service.js';

@Module({
  imports: [PrismaModule.forFeature([Prisma.ModelName.UserRole])],
  providers: [UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleDataModule {}
