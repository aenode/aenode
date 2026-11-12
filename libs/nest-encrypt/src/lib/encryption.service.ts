import { decrypt, encrypt } from '@aenode/encrypt';
import { Injectable } from '@aenode/nest/common';
import { InjectEncryptionKey } from './encryption-key.provider.js';

@Injectable()
export class EncryptionService {
  constructor(@InjectEncryptionKey() protected readonly key: Buffer) {}

  encrypt(plaintext: string) {
    return encrypt(plaintext, this.key);
  }

  decrypt(ciphertext: string) {
    return decrypt(ciphertext, this.key);
  }
}
