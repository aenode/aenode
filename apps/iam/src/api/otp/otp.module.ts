import { Module } from '@aenode/nest/common';
import { OtpDataModule } from '../../data/index.js';
import { OtpController } from './otp.controller.js';

@Module({
  imports: [OtpDataModule],
  controllers: [OtpController],
})
export class OtpModule {}
