import { InjectPrismaDelegate } from '@aenode/prisma';
import { Injectable } from '@nestjs/common';
import { OtpDelegateService } from '../../generated/dto/otp/otp.js';
import { Prisma } from '../../generated/prisma/client.js';

@Injectable()
export class OtpService extends OtpDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Otp) delegate: Prisma.OtpDelegate,
  ) {
    super(delegate);
  }
}
