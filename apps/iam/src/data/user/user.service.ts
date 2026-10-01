import { InjectPrismaDelegate } from '@aenode/prisma';
import { Injectable } from '@nestjs/common';
import { UserDelegateService } from '../../generated/dto/user/user.js';
import { Prisma } from '../../generated/prisma/client.js';

@Injectable()
export class UserService extends UserDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.User) delegate: Prisma.UserDelegate,
  ) {
    super(delegate);
  }
}
