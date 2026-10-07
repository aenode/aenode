import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ResponseMessageDto,
  UserId,
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
  logout(@UserId() userId: number) {
    return this.service.logout(userId);
  }

  @ApiOkResponse({
    type: ResponseMessageDto,
    description: 'Successfull logout',
  })
  @ApiOperation({ summary: 'Logout from all sessions' })
  @ApiUnauthorizedResponse()
  @Post('logout-all')
  logoutAll(@UserId() userId: number) {
    return this.service.logoutAll(userId);
  }
}
