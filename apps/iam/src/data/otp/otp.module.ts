import { Prisma } from '@aenode/iam-db';
import { EncryptionModule } from '@aenode/nest-encrypt';
import { OtpManagerModule } from '@aenode/nest-otp';
import { PrismaClientModule } from '@aenode/nest-prisma';
import { Module } from '@aenode/nest/common';
import { OtpService } from './otp.service.js';

@Module({
  imports: [
    OtpManagerModule,
    EncryptionModule.register(),
    PrismaClientModule.feature([Prisma.ModelName.Otp]),
  ],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpDataModule {}
