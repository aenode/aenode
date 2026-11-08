import { Module } from '@aenode/nest/common';
import { OtpManagerService } from './otp-manager.service.js';

@Module({
  providers: [OtpManagerService],
  exports: [OtpManagerService],
})
export class OtpManagerModule {}
