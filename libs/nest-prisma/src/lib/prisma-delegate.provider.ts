import { Inject, type Provider } from '@aenode/nest/common';
import type { PrismaClient } from '@prisma/client/extension';
import { getPrismaClientToken } from './prisma-client.provider.js';

export function getPrismaDelegateToken(
  modelName: string,
  scope: string | undefined,
): string {
  return [scope, modelName, 'PRISMA_DELEGATE_TOKEN']
    .filter((e) => e)
    .map((e) => e?.toUpperCase())
    .join('_');
}

export function providePrismaDelegate(
  modelName: string,
  scope: string | undefined,
): Provider {
  return {
    provide: getPrismaDelegateToken(modelName, scope),
    inject: [getPrismaClientToken(scope)],
    useFactory(client: PrismaClient) {
      return client[modelName];
    },
  };
}

export function InjectPrismaDelegate(
  modelName: string,
  scope?: string,
): ParameterDecorator {
  return (...args) => {
    Inject(getPrismaDelegateToken(modelName, scope))(...args);
  };
}
