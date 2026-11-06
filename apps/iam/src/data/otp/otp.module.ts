import { Prisma } from '@aenode/iam-db';
import { PrismaClientModule } from '@aenode/nest-prisma';
import { Module } from '@aenode/nest/common';
import { OtpService } from './otp.service.js';

@Module({
  imports: [PrismaClientModule.feature([Prisma.ModelName.Otp])],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpDataModule {}
