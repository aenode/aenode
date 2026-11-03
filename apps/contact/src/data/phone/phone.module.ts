import { Prisma } from '@aenode/contact-db';
import { PrismaClientModule } from '@aenode/nest-prisma';
import { Module } from '@aenode/nest/common';
import { PhoneService } from './phone.service.js';

@Module({
  imports: [PrismaClientModule.feature([Prisma.ModelName.Phone])],
  providers: [PhoneService],
  exports: [PhoneService],
})
export class PhoneDataModule {}
