import { Env } from '@aenode/env';
import { token } from '@aenode/names';
import { Inject, type Provider, type Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

/**
 * Get the prisma client token
 *
 * @param name optinoal client name
 * @returns
 */
export function getClientToken(name = Env.DEFAULT) {
  return token(name, 'sqlite prisma client');
}

/**
 * Provide prisma client instance
 * @param name client name
 * @returns
 */
export function provideClient(client: Type, name = Env.DEFAULT): Provider {
  return {
    provide: getClientToken(name),

    inject: [ConfigService],
    useFactory(config: ConfigService) {
      const url = config.getOrThrow(Env.DB.URL);
      const adapter = new PrismaBetterSqlite3({ url });
      return new client({ adapter });
    },
  };
}

export function InjectClient(name = Env.DEFAULT): ParameterDecorator {
  return (...args) => {
    Inject(getClientToken(name))(...args);
  };
}
