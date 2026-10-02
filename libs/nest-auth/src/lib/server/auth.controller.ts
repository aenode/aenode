import type { CryptoService } from '@aenode/nest-crypto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserId } from '../decorators/user-id.js';
import { UserUsername } from '../decorators/user-username.js';
import { UserUuid } from '../decorators/user-uuid.js';
import { AuthUserService } from './auth-user.service.js';
import { AuthService } from './auth.service.js';
import type { LoginWithOTPDto } from './dtos/login-with-otp.dto.js';
import type { LoginDto } from './dtos/login.dto.js';
import type { ResetPasswordDto } from './dtos/reset-password.dto.js';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    protected readonly authService: AuthService,
    protected readonly userService: AuthUserService,
    protected readonly crytoService: CryptoService,
  ) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  @Post('login-with-otp')
  async loginWithOTP(@Body() data: LoginWithOTPDto) {
    return await this.authService.loginWithOTP(data);
  }

  @Post('logout')
  async logout(@UserId() userId: number) {
    return await this.authService.logout(userId);
  }

  @Post('2fa')
  async enable2FA(@UserUsername() username: string) {
    return await this.authService.enable2FA(username);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() data: ResetPasswordDto,
    @UserUuid() uuid: string,
  ) {
    return await this.authService.resetPassword(data, uuid);
  }
}
