import { Prisma } from '@aenode/contact-db';
import { InjectPrismaDelegate } from '@aenode/nest-prisma';

export class EmailService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Email)
    protected readonly delegate: Prisma.EmailDelegate,
  ) {}

  create() {
    this.delegate.create({ data: { email: '', userId: 1 } });
  }
}
