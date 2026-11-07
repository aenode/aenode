import { Public, SessionId } from '@aenode/nest-decorators';
import { Body, Controller, Post, Req } from '@aenode/nest/common';
import type { Request } from '@aenode/nest/express';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@aenode/nest/swagger';
import { LoginResponseDto } from '../dtos/login-response.dto.js';
import { LoginWithOtpDto } from '../dtos/login-with-otp.dto.js';
import { LoginDto } from '../dtos/login.dto.js';
import { MessageResponseDto } from '../dtos/message-response.dto.js';
import { LoginService } from './login.service.js';

@ApiBearerAuth()
@Controller('auth')
export class LoginControler {
  constructor(protected readonly loginService: LoginService) {}

  @Public()
  @ApiOperation({ summary: 'Login with credentials' })
  @ApiOkResponse({ type: LoginResponseDto })
  @Post('login')
  login(@Body() data: LoginDto, @Req() req: Request) {
    return this.loginService.login(data, req);
  }

  @Public()
  @ApiOperation({ summary: 'Login with one-time-password' })
  @ApiOkResponse({ type: LoginResponseDto })
  @Post('login-with-otp')
  loginWithOtp(@Body() data: LoginWithOtpDto, @Req() req: Request) {
    return this.loginService.loginWithOtp(data, req);
  }

  @ApiOperation({ summary: 'Logout from the current session' })
  @ApiOkResponse({ type: MessageResponseDto })
  @Post('logout')
  logout(@SessionId() sessionId: number) {
    return this.loginService.logout(sessionId);
  }

  @ApiOperation({ summary: 'Logout from all sessions' })
  @ApiOkResponse({ type: MessageResponseDto })
  @Post('logout-all')
  logoutAll(@SessionId() sessionId: number) {
    return this.loginService.logoutAll(sessionId);
  }
}
