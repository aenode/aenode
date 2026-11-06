import { Injectable } from '@aenode/nest/common';
import { generateSecret, generateURI, NobleCryptoPlugin, verify } from 'otplib';
import { toBuffer, toDataURL } from 'qrcode';

@Injectable()
export class OtpManagerService {
  generateOtpSecret(): string {
    return generateSecret({
      length: 30,
      crypto: new NobleCryptoPlugin(),
    });
  }

  generateOtpUri(issuer: string, secret: string, label: string): string {
    return generateURI({
      issuer,
      label,
      secret,
      digits: 6,
      algorithm: 'sha1',
      strategy: 'totp',
      period: 30,
    });
  }

  async generateOtpQrCode(uri: string): Promise<string> {
    return await toDataURL(uri);
  }

  async generateOtpQrCodeBuffer(uri: string): Promise<Buffer> {
    return await toBuffer(uri);
  }

  async verifyOtp(token: string, secret: string): Promise<boolean> {
    const result = await verify({ secret, token, epochTolerance: [5, 0] });
    return result.valid;
  }
}
