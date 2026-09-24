import { Inject, type Provider, type Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { __DEFAULT__ } from './__constants.js';

export function getClientToken(name: string = __DEFAULT__) {
  return `${name}_PRISMA_CLIENT_TOKEN`;
}

export function provideClient(
  name: string = __DEFAULT__,
  client: Type,
): Provider {
  return {
    provide: getClientToken(name),

    inject: [ConfigService],
    useFactory(config: ConfigService) {
      const schema = config.getOrThrow('DATABASE_SCHEMA', 'public');
      const connectionString = config.getOrThrow('DATABASE_URL');

      const connectionTimeoutMillis = 5_000;
      const idleTimeoutMillis = 10_000;
      const lock_timeout = 5 * 60 * 1_000;
      const max = 10;
      const maxUses = 7500;
      const query_timeout = 10_000;
      const statement_timeout = 5_000;

      const adapter = new PrismaPg(
        {
          connectionString,
          connectionTimeoutMillis,
          idleTimeoutMillis,
          lock_timeout,
          max,
          maxUses,
          query_timeout,
          statement_timeout,
        },
        { schema },
      );
      return new client({ adapter });
    },
  };
}

export function InjectPrismaClient(
  name: string = __DEFAULT__,
): ParameterDecorator {
  return (...args) => {
    Inject(getClientToken(name))(...args);
  };
}
