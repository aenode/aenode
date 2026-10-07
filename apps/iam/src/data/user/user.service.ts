import type { PermissionRecord } from '@aenode/nest-auth';
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

  async permissions(userId: number): Promise<PermissionRecord | undefined> {
    const foundPermissions = await this.delegate.findUnique({
      where: { id: userId },
      select: {
        id: true,
        userPermissions: {
          select: {
            permission: {
              select: {
                resource: {
                  select: { name: true, scope: { select: { name: true } } },
                },
                operation: { select: { name: true } },
              },
            },
          },
        },
      },
    });

    return foundPermissions?.userPermissions.reduce((acc, p) => {
      const scopeName = p.permission.resource.scope.name;
      const resourceName = p.permission.resource.name;
      const operationName = p.permission.operation.name;

      acc[scopeName] ??= {};
      acc[scopeName][resourceName] ??= {};
      acc[scopeName][resourceName][operationName] ??= true;

      return acc;
    }, {} as PermissionRecord);
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
