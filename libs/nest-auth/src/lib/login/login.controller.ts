import { Body, Controller, Post } from '@aenode/nest/common';
import { LoginDto, LoginWithOtpDto } from './login.dto.js';
import type { LoginService } from './login.service.js';

@Controller('auth')
export class LoginController {
  constructor(protected readonly loginService: LoginService) {}

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.loginService.login(data);
  }

  @Post('login-with-otp')
  loginWithOtp(@Body() data: LoginWithOtpDto) {
    return this.loginService.loginWithOtp(data);
  }
}
