import { Global, Module, type DynamicModule, type Type } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { CryptoService } from './crypto.service.js';
import { ENCRYPTION_SECRET_TOKEN } from './encryption-secret-provider.js';

@Global()
@Module({
  providers: [
    {
      provide: ENCRYPTION_SECRET_TOKEN,
      useFactory: () => {
        const key = () => {
          const fileName = 'encirption_secret';

          if (existsSync(`./${fileName}`)) {
            return readFileSync(`./${fileName}`);
          } else {
            const key = randomBytes(32);

            writeFileSync(`./${fileName}`, key);

            return key;
          }
        };

        return key();
      },
    },
  ],
  exports: [ENCRYPTION_SECRET_TOKEN],
})
export class DefaultEncriptionSecretModule {}

@Module({
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {
  static register(
    encriptionSecretModule: Type = DefaultEncriptionSecretModule,
  ): DynamicModule {
    return {
      module: CryptoModule,
      imports: [encriptionSecretModule],
    };
  }
}
