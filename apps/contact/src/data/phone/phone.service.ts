import { Prisma } from '@aenode/contact-db';
import { PhoneDelegateService } from '@aenode/contact-db/nest';
import { InjectPrismaDelegate } from '@aenode/nest-prisma';
import { Injectable } from '@aenode/nest/common';

@Injectable()
export class PhoneService extends PhoneDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Phone)
    delegate: Prisma.PhoneDelegate,
  ) {
    super(delegate);
  }
}
