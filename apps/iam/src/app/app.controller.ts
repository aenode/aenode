import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('info')
  info() {
    return { name: 'iam' };
  }
}
