import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiProduces,
  UserId,
} from '@aenode/nest';
import { CryptoService } from '@aenode/nest-crypto';
import {
  Controller,
  Header,
  NotFoundException,
  Post,
  StreamableFile,
} from '@nestjs/common';
import { OtpService, UserService } from '../../data/index.js';

@ApiBearerAuth()
@Controller('auth/2fa')
export class Otp2FAController {
  constructor(
    protected readonly otpService: OtpService,
    protected readonly userService: UserService,
    protected readonly cryptoService: CryptoService,
  ) {}

  @ApiOperation({ summary: 'Enable 2FA' })
  @ApiProduces('image/png')
  @ApiCreatedResponse({
    description: 'QR code for authenticator app enrollment',
    content: {
      'image/png': { schema: { type: 'string', format: 'binary' } },
    },
  })
  @Header('Content-Type', 'image/png')
  @Header('Cache-Control', 'no-store')
  @Post()
  async enable(@UserId() userId: number) {
    const user = await this.userService.findUniqueOneById(userId);
    if (!user) throw new NotFoundException('User not found');

    const secret = await this.cryptoService.generateOtpSecret();
    const encriptedSecret = this.cryptoService.encrypt(secret);
    await this.otpService.upsertOneByUserId({
      secret: encriptedSecret,
      userId,
    });

    const data = await this.cryptoService.generateOtpQrCodeBuffer(
      await this.cryptoService.generateOtpUri(secret, user.username),
    );
    return new StreamableFile(data);
  }
}
