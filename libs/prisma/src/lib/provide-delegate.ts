import { Inject, type Provider } from '@nestjs/common';
import { __DEFAULT__ } from './__constants.js';
import { getClientToken } from './provide-client.js';

export function getDelegateToken(
  modelName: string,
  name: string = __DEFAULT__,
) {
  return `${name}_${modelName}_PRISMA_DELEGATE_TOKEN`;
}

export function provideDelegate<T extends string>(
  modelName: T,
  name: string = __DEFAULT__,
): Provider {
  return {
    provide: getDelegateToken(modelName, name),
    inject: [getClientToken(name)],
    useFactory<Client extends Record<T, unknown>>(client: Client) {
      return client[modelName];
    },
  };
}

export function InjectPrismaDelegate(
  modelName: string,
  name: string = __DEFAULT__,
): ParameterDecorator {
  return (...args) => {
    Inject(getDelegateToken(modelName, name))(...args);
  };
}
