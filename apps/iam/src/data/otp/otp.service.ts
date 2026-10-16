import { CryptoService } from '@aenode/nest-crypto';
import { InjectPrismaDelegate } from '@aenode/prisma';
import { Injectable } from '@nestjs/common';
import {
  OtpCreateDto,
  OtpDelegateService,
  OtpUpdateDto,
} from '../../generated/dto/otp/otp.js';
import { Prisma } from '../../generated/prisma/client.js';

@Injectable()
export class OtpService extends OtpDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Otp) delegate: Prisma.OtpDelegate,
    protected readonly cryptoService: CryptoService,
  ) {
    super(delegate);
  }

  enableOtpByUserId(userId: number) {
    return this.delegate.update({
      where: { userId },
      data: { enabled: true, isActive: true },
    });
  }

  findUniqueOneByUsername(username: string) {
    return this.delegate.findFirst({
      where: {
        user: { username, isActive: true },
        isActive: true,
        enabled: true,
      },
    });
  }

  protected override beforeUpsert<T extends OtpCreateDto | OtpUpdateDto>(
    data: T,
  ): Promise<T> {
    const secret = data.secret
      ? this.cryptoService.encrypt(data.secret)
      : data.secret;

    return { ...data, secret } as unknown as Promise<T>;
  }
}
