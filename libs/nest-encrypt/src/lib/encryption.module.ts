import { Module, type DynamicModule } from '@aenode/nest/common';
import { ConfigModule } from '@aenode/nest/config';
import {
  getEncryptionKeyToken,
  provideEncryptionKey,
} from './encryption-key.provider.js';
import { EncryptionService } from './encryption.service.js';

@Module({
  imports: [ConfigModule],
  providers: [EncryptionService],
})
export class EncryptionModule {
  static register(target?: string, scope?: string): DynamicModule {
    return {
      module: EncryptionModule,
      providers: [provideEncryptionKey(target, scope), EncryptionService],
      exports: [getEncryptionKeyToken(target, scope)],
    };
  }
}
