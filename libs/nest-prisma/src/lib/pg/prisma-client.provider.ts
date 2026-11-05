import { Duration, Env, MetadataToken } from '@aenode/constants';
import { Inject, type Provider, type Type } from '@aenode/nest/common';
import { ConfigService } from '@aenode/nest/config';
import { PrismaPg } from '@prisma/adapter-pg';
import type { PrismaClient } from '@prisma/client/extension';

export function getPrismaClientToken(scope: string | undefined): string {
  return [scope, MetadataToken.PRISMA_CLIENT]
    .filter((e) => e)
    .map((e) => e?.toUpperCase())
    .join('_');
}

export function providePrismaClient(
  client: Type<PrismaClient>,
  scope: string | undefined,
): Provider {
  return {
    provide: getPrismaClientToken(scope),
    inject: [ConfigService],
    useFactory(config: ConfigService) {
      const SCHEMA = config.getOrThrow(Env.DB.DATABASE_SCHEMA, 'public');

      const URL = config.getOrThrow(Env.DB.DATABASE_URL);

      const CONNECTION_TIMEOUT_MILLIS = config.getOrThrow(
        Env.DB.PG.CONNECTION_TIMEOUT_MILLIS,
        Duration.SECONDS_5,
      );

      const IDLE_TIMEOUT_MILLIS = config.getOrThrow(
        Env.DB.PG.IDLE_TIMEOUT_MILLIS,
        Duration.SECONDS_10,
      );

      const LOCK_TIMEOUT = config.getOrThrow(
        Env.DB.PG.LOCK_TIMEOUT,
        Duration.MINUTES_5,
      );

      const MAX = config.getOrThrow(Env.DB.PG.MAX, 10);

      const MAX_USES = config.getOrThrow(Env.DB.PG.MAX_USES, 7500);

      const QUERY_TIMEOUT = config.getOrThrow(
        Env.DB.PG.QUERY_TIMEOUT,
        Duration.SECONDS_5,
      );

      const STATEMENT_TIMEOUT = config.getOrThrow(
        Env.DB.PG.STATEMENT_TIMEOUT,
        Duration.SECONDS_5,
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

export function InjectPrismaClient(
  scope: string | undefined,
): ParameterDecorator {
  return (...args) => {
    Inject(getPrismaClientToken(scope))(...args);
  };
}
