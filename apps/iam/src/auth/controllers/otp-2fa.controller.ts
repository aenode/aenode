import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProduces,
  ApiUnauthorizedResponse,
  UserId,
} from '@aenode/nest';
import { EnableOtpDto } from '@aenode/nest-auth';
import { Body, Controller, Header, Post } from '@nestjs/common';
import { LoginService } from '../services/login.service.js';

@ApiBearerAuth()
@Controller('auth/2fa')
export class Otp2FAController {
  constructor(protected readonly loginService: LoginService) {}

  @ApiOperation({ summary: 'Create 2FA' })
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
  create2FA(@UserId() userId: number) {
    return this.loginService.create2FA(userId);
  }

  @ApiOperation({ summary: 'Enable 2FA' })
  @ApiOkResponse({ description: 'Enabled 2FA' })
  @ApiUnauthorizedResponse({ description: 'Not autorized for the operation' })
  @Post('enable')
  enable2FA(@Body() data: EnableOtpDto, @UserId() userId: number) {
    return this.loginService.enable2FA(data, userId);
  }
}
