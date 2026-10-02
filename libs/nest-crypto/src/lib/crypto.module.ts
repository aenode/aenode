import { Module, type DynamicModule } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { CryptoService } from './crypto.service.js';
import { provideCryptoKey } from './key.provider.js';

@Module({})
export class CryptoModule {
  static register(): DynamicModule {
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
    return {
      module: CryptoModule,
      providers: [provideCryptoKey(key()), CryptoService],
      exports: [CryptoService],
    };
  }
}
