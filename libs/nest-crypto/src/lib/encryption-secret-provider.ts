import { Inject, type Provider } from '@nestjs/common';

export const ENCRYPTION_SECRET_TOKEN = 'CRYPTO_KEY_TOKEN';

export function provideEncryptionSecret(secret: Buffer): Provider {
  return {
    provide: ENCRYPTION_SECRET_TOKEN,
    useValue: secret,
  };
}

export function InjectEncryptionSecret(): ParameterDecorator {
  return (...args) => {
    Inject(ENCRYPTION_SECRET_TOKEN)(...args);
  };
}
