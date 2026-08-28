import { Env } from '@aenode/env';
import { token } from '@aenode/names';
import { Inject, type Provider, type Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';

/**
 * Get the prisma client token
 *
 * @param name optinoal client name
 * @returns
 */
export function getClientToken(name = Env.DEFAULT) {
  return token(name, 'pg prisma client');
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
      const SCHEMA = config.getOrThrow(Env.DB.SCHEMA, 'public');

      const URL = config.getOrThrow(Env.DB.URL);

      const CONNECTION_TIMEOUT_MILLIS = config.getOrThrow(
        Env.DB.POOL.CONNECTION_TIMEOUT_MILLIS,
        Env.D_5_SECONDS,
      );

      const IDLE_TIMEOUT_MILLIS = config.getOrThrow(
        Env.DB.POOL.IDLE_TIMEOUT_MILLIS,
        Env.D_10_SECONDS,
      );

      const LOCK_TIMEOUT = config.getOrThrow(
        Env.DB.POOL.LOCK_TIMEOUT,
        Env.D_5_MINUTES,
      );

      const MAX = config.getOrThrow(Env.DB.POOL.MAX, 10);

      const MAX_USES = config.getOrThrow(Env.DB.POOL.MAX_USES, 7500);

      const QUERY_TIMEOUT = config.getOrThrow(
        Env.DB.POOL.QUERY_TIMEOUT,
        Env.D_10_SECONDS,
      );

      const STATEMENT_TIMEOUT = config.getOrThrow(
        Env.DB.POOL.STATEMENT_TIMEOUT,
        Env.D_5_SECONDS,
      );

      const adapter = new PrismaPg(
        {
          connectionString: URL,
          connectionTimeoutMillis: CONNECTION_TIMEOUT_MILLIS,
          idleTimeoutMillis: IDLE_TIMEOUT_MILLIS,
          lock_timeout: LOCK_TIMEOUT,
          max: MAX,
          maxUses: MAX_USES,
          query_timeout: QUERY_TIMEOUT,
          statement_timeout: STATEMENT_TIMEOUT,
        },

        { schema: SCHEMA },
      );
      return new client({ adapter });
    },
  };
}

export function InjectClient(name = Env.DEFAULT): ParameterDecorator {
  return (...args) => {
    Inject(getClientToken(name))(...args);
  };
}
