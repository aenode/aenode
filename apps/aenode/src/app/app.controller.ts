import { Env } from '@aenode/constants';
import { Controller, Get } from '@aenode/nest/common';
import { ConfigService } from '@aenode/nest/config';

@Controller()
export class AppController {
  constructor(protected readonly config: ConfigService) {}

  @Get('info')
  info() {
    const profile = this.config.get<string>(Env.APP.PROFILE);

    const env = profile ? new Env(profile) : Env;

    const get = (key: string) => this.config.get(key);

    return {
      name: get(env.APP.NAME),
      description: get(env.APP.DESCRIPTION),
      apiPrefix: get(env.APP.API_PREFIX),
      port: get(env.APP.PORT),
      allowedOrigins: get(env.AUTH.ALLOWED_ORIGINS),
      authProfile: get(env.AUTH.AUTH_PROFILE),
    };
  }
}
