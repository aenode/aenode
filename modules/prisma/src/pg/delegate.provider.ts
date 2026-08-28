import { Env } from '@aenode/env';
import { extractResourceName } from '@aenode/names';
import { Inject, type Provider } from '@nestjs/common';
import { getClientToken } from './client.provider.js';

/**
 * Get the prisma client token
 * @param modelName model name
 * @param name optinoal client name
 * @returns
 */
export function getDelegateToken(modelName: string, name = Env.DEFAULT) {
  return `${modelName}_DELEGATE_${getClientToken(name)}`;
}

/**
 * Provide prisma client instance
 *
 * @param modelName model name
 * @param name client name
 * @returns
 */
export function provideDelegate(
  modelName: string,
  name = Env.DEFAULT,
): Provider {
  return {
    provide: getDelegateToken(modelName, name),
    inject: [getClientToken(name)],
    useFactory(client: any) {
      return client[modelName];
    },
  };
}

export function InjectDelegate(
  modelName = '',
  name = Env.DEFAULT,
): ParameterDecorator {
  return (...args) => {
    modelName ||= extractResourceName(args[0].constructor.name);

    Inject(getDelegateToken(modelName, name))(...args);
  };
}
