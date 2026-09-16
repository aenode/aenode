import { Env } from '@aenode/env';
import type { ConfigService } from '@nestjs/config';

export function getConfig(config: ConfigService) {
  return {
    APP_PORT: config.getOrThrow<number>(Env.APP.PORT),
    APP_ID: config.getOrThrow<string>(Env.APP.ID),
    APP_DESCRIPTION: config.get<string>(
      Env.APP.DESCRIPTION,
      'App description is missing',
    ),
    APP_PROFILE: config.getOrThrow<string>(Env.APP.PROFILE),
    APP_USERNAME: config.getOrThrow<string>(Env.APP.USERNAME),
    APP_PASSWORD: config.getOrThrow<string>(Env.APP.PASSWORD),
    APP_ORIGIN: config.getOrThrow<string>(Env.APP.ORIGIN),
    APP_PREFIX: config.getOrThrow<string>(Env.APP.PREFIX, 'api'),
    APP_DOCS: config.get<string>(Env.APP.DOCS, '/docs'),
  };
}
