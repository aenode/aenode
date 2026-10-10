import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ResponseMessageDto,
  SessionId,
} from '@aenode/nest';
import { Controller, Post } from '@nestjs/common';
import { LoginService } from '../services/login.service.js';

@ApiBearerAuth()
@Controller('auth')
export class LogoutController {
  constructor(protected readonly service: LoginService) {}

  @ApiOkResponse({
    type: ResponseMessageDto,
    description: 'Successfull logout',
  })
  @ApiOperation({ summary: 'Logout from the current session' })
  @ApiUnauthorizedResponse()
  @Post('logout')
  logout(@SessionId() sessionId: number) {
    return this.service.logout(sessionId);
  }

  @ApiOkResponse({
    type: ResponseMessageDto,
    description: 'Successfull logout',
  })
  @ApiOperation({ summary: 'Logout from all sessions' })
  @ApiUnauthorizedResponse()
  @Post('logout-all')
  logoutAll(@SessionId() sessionId: number) {
    return this.service.logoutAll(sessionId);
  }
}
