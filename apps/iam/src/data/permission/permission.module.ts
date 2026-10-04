import { PrismaModule } from '@aenode/prisma';
import { Module } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PermissionService } from './permission.service.js';

@Module({
  imports: [PrismaModule.forFeature([Prisma.ModelName.Permission])],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissoinDataModule {}
