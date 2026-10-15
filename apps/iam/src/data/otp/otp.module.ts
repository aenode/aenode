import { CryptoModule } from '@aenode/nest-crypto';
import { PrismaModule } from '@aenode/prisma';
import { Module } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { OtpService } from './otp.service.js';

@Module({
  imports: [PrismaModule.forFeature([Prisma.ModelName.Otp]), CryptoModule],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpDataModule {}
