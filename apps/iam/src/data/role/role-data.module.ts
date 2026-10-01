import { PrismaModule } from '@aenode/prisma';
import { Module } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { RoleService } from './role.service.js';

@Module({
  imports: [PrismaModule.forFeature([Prisma.ModelName.Role])],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleDataModule {}
