import { Prisma } from '@aenode/iam-db';
import { OtpDelegateService } from '@aenode/iam-db/nest';
import { InjectPrismaDelegate } from '@aenode/nest-prisma';
import { Injectable } from '@aenode/nest/common';

@Injectable()
export class OtpService extends OtpDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Otp)
    delegate: Prisma.OtpDelegate,
  ) {
    super(delegate);
  }
}
