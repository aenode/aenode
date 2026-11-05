import { Prisma } from '@aenode/contact-db';
import { UserDelegateService } from '@aenode/contact-db/nest';
import { InjectPrismaDelegate } from '@aenode/nest-prisma';
import { Injectable } from '@aenode/nest/common';

@Injectable()
export class UserService extends UserDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.User)
    delegate: Prisma.UserDelegate,
  ) {
    super(delegate);
  }
}
