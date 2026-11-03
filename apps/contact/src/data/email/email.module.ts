import { Prisma } from '@aenode/contact-db';
import { PrismaClientModule } from '@aenode/nest-prisma';
import { Module } from '@aenode/nest/common';
import { EmailService } from './email.service.js';

@Module({
  imports: [PrismaClientModule.feature([Prisma.ModelName.Email])],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailDataModule {}
