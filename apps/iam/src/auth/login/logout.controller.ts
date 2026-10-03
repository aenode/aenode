import { ApiBearerAuth, SessionId, UserId } from '@aenode/nest';
import { Controller, Post } from '@nestjs/common';
import type { LoginService } from './login.service.js';

@ApiBearerAuth()
@Controller('auth')
export class LogoutController {
  constructor(protected readonly service: LoginService) {}

  @Post('logout')
  logout(@SessionId() sessionId: number) {
    return this.service.logout(sessionId);
  }

  @Post('logout-all')
  logoutAll(@UserId() userId: number) {
    return this.service.logoutAll(userId);
  }
}
