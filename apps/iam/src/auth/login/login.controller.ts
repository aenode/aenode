import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  Public,
  ResponseMessageDto,
} from '@aenode/nest';
import { LoginDto, LoginResponseDto, OtpLoginDto } from '@aenode/nest-auth';
import { Body, Controller, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { LoginService } from './login.service.js';

@Public()
@Controller('auth')
export class LoginController {
  constructor(protected readonly service: LoginService) {}

  @ApiOkResponse({ type: LoginResponseDto, description: 'Successful login' })
  @ApiUnauthorizedResponse({
    type: ResponseMessageDto,
    description: 'User not found or wrong password',
  })
  @ApiOperation({ summary: 'Login with credentials' })
  @Post('login')
  login(
    @Body() data: LoginDto,
    @Req() req: Request,
  ): Promise<LoginResponseDto> {
    return this.service.login(data, req);
  }

  @ApiOkResponse({ type: LoginResponseDto, description: 'Successful login' })
  @ApiUnauthorizedResponse({
    type: ResponseMessageDto,
    description: 'User not found or invalid otp',
  })
  @ApiOperation({ summary: 'Login with username and otp' })
  @Post('login-with-otp')
  loginWithOpt(@Body() data: OtpLoginDto, @Req() req: Request) {
    return this.service.loginWithOpt(data, req);
  }
}
