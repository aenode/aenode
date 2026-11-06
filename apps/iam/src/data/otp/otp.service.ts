import { Prisma } from '@aenode/iam-db';
import {
  OtpCreateDto,
  OtpDelegateService,
  OtpUpdateDto,
} from '@aenode/iam-db/nest';
import type { EncryptionService } from '@aenode/nest-encrypt';
import { OtpService as OtpManagerService } from '@aenode/nest-otp';
import { InjectPrismaDelegate } from '@aenode/nest-prisma';
import { Injectable } from '@aenode/nest/common';
@Injectable()
export class OtpService extends OtpDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Otp)
    delegate: Prisma.OtpDelegate,
    protected readonly otpManagerService: OtpManagerService,
    protected readonly encriptionService: EncryptionService,
  ) {
    super(delegate);
  }

  protected override async beforeCreateAndUpdate<
    T extends OtpUpdateDto | OtpCreateDto,
  >(data: T): Promise<T> {
    const newData = { ...data };
    if (newData.secret) {
      newData.secret = this.encriptionService.encrypt(newData.secret);
    }
    return newData;
  }
}
