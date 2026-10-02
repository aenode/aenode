import {
  decrypt,
  encrypt,
  generateSecret,
  generateURI,
  hash,
  NobleCryptoPlugin,
  verify,
  verifyHash,
} from '@aenode/crypto';
import { Injectable } from '@nestjs/common';
import { toDataURL } from 'qrcode';
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

  decrypt(value: string) {
    return decrypt(value, this.key);
  }

  async generateOtpSecret() {
    return await generateSecret({
      length: 30,
      crypto: new NobleCryptoPlugin(),
    });
  }

  async generateOtpUri(secret: string, username: string) {
    return generateURI({
      issuer: 'aenode',
      label: username,
      secret,
      digits: 6,
      algorithm: 'sha1',
      strategy: 'totp',
      period: 30,
    });
  }

  async generateOtpQrCode(uri: string) {
    return await toDataURL(uri);
  }

  async verifyOtp(token: string, secret: string) {
    const result = await verify({
      secret,
      token,
      epochTolerance: [5, 0],
    });

    return result.valid;
  }
}
