import { decrypt, encrypt, hash, verifyHash } from '@aenode/crypto';
import { Injectable } from '@nestjs/common';
import { InjectCryptoKey } from './key.provider.js';

@Injectable()
export class CryptoService {
  constructor(@InjectCryptoKey() protected readonly key: Buffer) {}

  async hash(password: string) {
    return await hash(password);
  }

  async verifyHash(hashed: string, password: string) {
    return await verifyHash(hashed, password);
  }

  encrypt(value: string) {
    return encrypt(value, this.key);
  }

  descript(value: string) {
    return decrypt(value, this.key);
  }
}
