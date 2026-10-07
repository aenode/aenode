import { PrismaModule } from '@aenode/prisma';
import { Module } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';

@Module({
  imports: [PrismaModule.forFeature([Prisma.ModelName.User])],
})
export class SeedModule {}
