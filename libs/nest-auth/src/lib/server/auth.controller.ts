import type { CryptoService } from '@aenode/nest-crypto';
import { Body, Controller, Optional, Post, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import type { Request } from 'express';
import { HeaderDeviceId, Public, UserId } from '../decorators/index.js';
import { SessionId } from '../decorators/session-id.js';
import { AuthUserService } from './auth-user.service.js';
import { AuthService } from './auth.service.js';
import type {
  LoginDto,
  LoginWithOTPDto,
  ResetPasswordDto,
} from './dtos/index.js';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    protected readonly authService: AuthService,
    protected readonly userService: AuthUserService,
    protected readonly crytoService: CryptoService,
  ) {}

  @Public()
  @Post('login')
  async login(
    @Body() data: LoginDto,
    @Req() req: Request,
    @Optional() @HeaderDeviceId() deviceId: string | undefined,
  ) {
    return await this.authService.login(data, req, deviceId);
  }

  @Public()
  @Post('login-with-otp')
  async loginWithOTP(
    @Body() data: LoginWithOTPDto,
    @Req() req: Request,
    @Optional() @HeaderDeviceId() deviceId: string | undefined,
  ) {
    return await this.authService.loginWithOTP(data, req, deviceId);
  }

  @Post('logout')
  async logout(@SessionId() sessionId: number) {
    return await this.authService.logout(sessionId);
  }

  @Post('logout-all')
  async logoutAll(@UserId() userId: number) {
    return await this.authService.logoutAll(userId);
  }

  @Post('enable-2fa')
  async enable2FA(@UserId() userId: number) {
    return await this.authService.enable2FA(userId);
  }

  @Post('disable-2fa')
  async disable2FA(@UserId() userId: number) {
    return await this.authService.disable2FA(userId);
  }

  @Post('reset-password')
  async resetPassword(
    @UserId() userId: number,
    @Body() data: ResetPasswordDto,
  ) {
    return await this.authService.resetPassword(userId, data);
  }
}
