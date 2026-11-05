import { MetadataToken } from '@aenode/constants';
import { Inject, type Provider } from '@aenode/nest/common';
import { ConfigService } from '@aenode/nest/config';

export function getEncryptionKeyToken(target?: string, scope?: string): string {
  return [scope, target, MetadataToken.ENCRIPTION_KEY]
    .filter((e) => e)
    .map((e) => e?.toUpperCase())
    .join('_');
}

export function provideEncryptionKey(
  target?: string,
  scope?: string,
): Provider {
  const token = getEncryptionKeyToken(target, scope);
  return {
    provide: token,
    inject: [ConfigService],
    useFactory(config: ConfigService) {
      return config.getOrThrow(token);
    },
  };
}

export function InjectEncryptionKey(
  target?: string,
  scope?: string,
): ParameterDecorator {
  return (...args) => {
    Inject(getEncryptionKeyToken(target, scope))(...args);
  };
}
