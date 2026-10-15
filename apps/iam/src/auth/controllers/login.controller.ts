import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  Public,
  ResponseMessageDto,
  type ExtendedRequest,
} from '@aenode/nest';
import { LoginDto, LoginResponseDto, OtpLoginDto } from '@aenode/nest-auth';
import { Body, Controller, Post, Req } from '@nestjs/common';

import { LoginService } from '../services/login.service.js';

@Public()
@Controller('auth')
export class LoginController {
  constructor(protected readonly loginService: LoginService) {}

  @ApiOkResponse({ type: LoginResponseDto, description: 'Successful login' })
  @ApiUnauthorizedResponse({
    type: ResponseMessageDto,
    description: 'User not found or wrong password',
  })
  @ApiOperation({ summary: 'Login with credentials' })
  @Post('login')
  login(
    @Body() data: LoginDto,
    @Req() req: ExtendedRequest,
  ): Promise<LoginResponseDto> {
    return this.loginService.login(data, req);
  }

  @ApiOkResponse({ type: LoginResponseDto, description: 'Successful login' })
  @ApiUnauthorizedResponse({
    type: ResponseMessageDto,
    description: 'User not found or invalid otp',
  })
  @ApiOperation({ summary: 'Login with username and otp' })
  @Post('login-with-otp')
  loginWithOpt(@Body() data: OtpLoginDto, @Req() req: ExtendedRequest) {
    return this.loginService.loginWithOpt(data, req);
  }
}
