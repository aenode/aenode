import { Module } from '@aenode/nest/common';
import { OtpService } from './otp.service.js';

@Module({
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
