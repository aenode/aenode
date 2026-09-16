import { Env } from '@aenode/env';
import { CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse } from '@nestjs/swagger';
import { Prop } from '../decorators/index.js';
import { Public } from '../decorators/public.js';

export class InfoDto {
  @Prop() appId: string;
}

@Controller()
export class CommonController {
  constructor(protected readonly config: ConfigService) {}

  @Public()
  @CacheTTL(Env.D_5_MINUTES)
  @ApiOkResponse({ type: InfoDto, nullable: false })
  @Get('info')
  info(): InfoDto {
    return { appId: this.config.get(Env.APP.ID) ?? '' };
  }

  @Public()
  @CacheTTL(Env.D_5_MINUTES)
  @ApiOkResponse()
  @Get('ping')
  ping(): void {
    return;
  }
}
