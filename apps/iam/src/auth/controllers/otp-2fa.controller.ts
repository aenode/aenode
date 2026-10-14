import { ApiBearerAuth, UserId } from '@aenode/nest';
import { CryptoService } from '@aenode/nest-crypto';
import { Controller, NotFoundException, Post } from '@nestjs/common';
import { OtpService, UserService } from '../../data/index.js';

@ApiBearerAuth()
@Controller('auth')
export class Otp2FAController {
  constructor(
    protected readonly otpService: OtpService,
    protected readonly userService: UserService,
    protected readonly cryptoService: CryptoService,
  ) {}

  @Post('enable-2fa')
  async enable(@UserId() userId: number) {
    const user = await this.userService.findUniqueOneById(userId);
    if (!user) throw new NotFoundException('User not found');
    const otp = await this.otpService.findUniqueOneByUserId(userId);

    if (!otp) throw new NotFoundException('Otp not found');
    const secret = this.cryptoService.decrypt(otp?.secret);

    const qrcode = await this.cryptoService.generateOtpQrCode(
      await this.cryptoService.generateOtpUri(secret, user.username),
    );
    return {
      data: qrcode,
    };
  }
}
