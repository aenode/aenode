import { CryptoService } from '@aenode/nest-crypto';
import { InjectPrismaDelegate } from '@aenode/prisma';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  UserCreateDto,
  UserDelegateService,
  UserUpdateDto,
} from '../../generated/dto/user/user.js';
import { Prisma } from '../../generated/prisma/client.js';

@Injectable()
export class UserService extends UserDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.User) delegate: Prisma.UserDelegate,
    protected readonly cryptoService: CryptoService,
  ) {
    super(delegate);
  }

  override async beforeCreateAndUpdate<T extends UserCreateDto | UserUpdateDto>(
    data: T,
  ): Promise<T> {
    const errors = await this.isUniqueExist(data);
    if (errors && errors.length > 0) {
      throw new UnprocessableEntityException({ errors });
    }

    if (data.password !== undefined) {
      data.password = await this.cryptoService.hash(data.password);
    }

    return data;
  }
}
