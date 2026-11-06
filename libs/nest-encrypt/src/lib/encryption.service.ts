import { decrypt, encrypt } from '@aenode/encrypt';
import { Injectable } from '@aenode/nest/common';

@Injectable()
export class EncryptionService {
  constructor(protected readonly key: Buffer) {}

  encrypt(plaintext: string) {
    return encrypt(plaintext, this.key);
  }

  decrypt(ciphertext: string) {
    return decrypt(ciphertext, this.key);
  }
}
