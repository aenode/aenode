import { Controller, Get } from '@nestjs/common';
import { AppConfigService } from './app-config.service.js';

@Controller()
export class AppController {
  constructor(public readonly appConfig: AppConfigService) {}

  @Get('info')
  info() {
    return this.appConfig.CONFIG;
  }
}
