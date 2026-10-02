import { Inject, type Provider } from '@nestjs/common';

export const CRYPTO_KEY_TOKEN = 'CRYPTO_KEY_TOKEN';

export function provideCryptoKey(key: Buffer): Provider {
  return {
    provide: CRYPTO_KEY_TOKEN,
    useValue: key,
  };
}

export function InjectCryptoKey(): ParameterDecorator {
  return (...args) => {
    Inject(CRYPTO_KEY_TOKEN)(...args);
  };
}
