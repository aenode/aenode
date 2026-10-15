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
import { toBuffer, toDataURL } from 'qrcode';
import { InjectEncryptionSecret } from './encryption-secret-provider.js';

@Injectable()
export class CryptoService {
  constructor(
    @InjectEncryptionSecret() protected readonly encryptionSecret: Buffer,
  ) {}
  async hash(password: string) {
    return await hash(password);
  }

  async verifyHash(hashed: string, password: string) {
    return await verifyHash(hashed, password);
  }

  encrypt(value: string) {
    return encrypt(value, this.encryptionSecret);
  }

  decrypt(value: string) {
    return decrypt(value, this.encryptionSecret);
  }

  generateOtpSecret() {
    return generateSecret({
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

  async generateOtpQrCodeBuffer(uri: string) {
    return await toBuffer(uri);
  }

  async verifyOtp(token: string, secret: string) {
    const result = await verify({ secret, token, epochTolerance: [5, 0] });
    return result.valid;
  }
}
