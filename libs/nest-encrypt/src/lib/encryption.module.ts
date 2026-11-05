import { Module, type DynamicModule } from '@aenode/nest/common';
import { ConfigModule } from '@aenode/nest/config';
import {
  getEncryptionKeyToken,
  provideEncryptionKey,
} from './encryption-key.provider.js';
import { EncriptionService } from './encryption.service.js';

@Module({
  imports: [ConfigModule],
})
export class EncryptionModule {
  static register(target?: string, scope?: string): DynamicModule {
    return {
      module: EncryptionModule,
      providers: [provideEncryptionKey(target, scope), EncriptionService],
      exports: [getEncryptionKeyToken(target, scope)],
    };
  }
}
