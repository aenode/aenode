import { Prisma } from '@aenode/contact-db';
import { EmailDelegateService } from '@aenode/contact-db/nest';
import { InjectPrismaDelegate } from '@aenode/nest-prisma';
import { Injectable } from '@aenode/nest/common';

@Injectable()
export class EmailService extends EmailDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Email)
    delegate: Prisma.EmailDelegate,
  ) {
    super(delegate);
  }
}
