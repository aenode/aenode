import { PrismaModule } from '@aenode/prisma';
import { Module } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { ResourceService } from './resource.service.js';

@Module({
  imports: [PrismaModule.forFeature([Prisma.ModelName.Resource])],
  providers: [ResourceService],
  exports: [ResourceService],
})
export class ResourceDataModule {}
