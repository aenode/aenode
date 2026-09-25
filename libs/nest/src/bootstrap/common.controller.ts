import { Controller, Get } from '@nestjs/common';

@Controller()
export class CommonController {
  @Get('ping')
  ping() {
    return { pong: 'pong' };
  }
}
