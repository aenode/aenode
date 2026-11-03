import { Prisma } from '@aenode/contact-db';
import { PrismaClientModule } from '@aenode/nest-prisma';
import { Module } from '@aenode/nest/common';
import { AddressService } from './address.service.js';

@Module({
  imports: [PrismaClientModule.feature([Prisma.ModelName.Address])],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressDataModule {}
