import { Prisma } from '@aenode/contact-db';
import { PrismaClientModule } from '@aenode/nest-prisma';
import { Module } from '@aenode/nest/common';

@Module({
  imports: [PrismaClientModule.feature([Prisma.ModelName.Email])],
})
export class EmailDataModule {}
