import { Public } from '@aenode/nest-decorators';
import { Body, Controller, Post, Req } from '@aenode/nest/common';
import type { Request } from '@aenode/nest/express';
import type { LoginWithOtpDto } from '../dtos/login-with-otp.dto.js';
import type { LoginDto } from '../dtos/login.dto.js';
import type { LoginService } from './login.service.js';

@Controller('auth')
export class LoginControler {
  constructor(protected readonly loginService: LoginService) {}
  @Public()
  @Post('login')
  login(@Body() data: LoginDto, @Req() req: Request) {
    return this.loginService.login(data, req);
  }

  @Public()
  @Post('login-with-otp')
  loginWithOtp(data: LoginWithOtpDto, req: Request) {
    return this.loginService.loginWithOtp(data, req);
  }
}
