import type { CryptoService } from '@aenode/nest-crypto';
import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthUserService } from './auth-user.service.js';

@ApiBearerAuth()
@Controller('login')
export class AuthController {
  constructor(
    protected readonly userService: AuthUserService,
    protected readonly crytoService: CryptoService,
  ) {}

  @Post('login')
  async login() {
    return '';
  }

  loginWithOTP() {
    return '';
  }

  logout() {
    return '';
  }

  enable2FA() {
    return;
  }

  forgotPassword() {
    //
  }
}
