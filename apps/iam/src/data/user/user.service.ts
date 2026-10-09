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

  async users() {
    const __users = await this.delegate.findMany({
      select: {
        id: true,
        username: true,
        userRoles: {
          select: { id: true, role: { select: { id: true, name: true } } },
        },
        userPermissions: {
          select: {
            id: true,
            permission: {
              select: {
                id: true,
                operation: { select: { id: true, name: true } },
                resource: {
                  select: {
                    id: true,
                    name: true,
                    scope: { select: { id: true, name: true } },
                  },
                },
              },
            },
          },
        },
        sessions: {
          select: { id: true, deviceId: true },
        },
      },
    });

    return __users.map((u) => {
      const roles = u.userRoles.map((r) => r.role.name);
      const permissions = u.userPermissions.map(
        (p) =>
          `${p.permission.resource.scope.name}.${p.permission.resource.name}.${p.permission.operation.name}`,
      );
      const sessions = u.sessions.map((s) => s.id);
      return {
        id: u.id,
        username: u.username,
        roles: new Set(roles),
        permissions: new Set(permissions),
        sessions: new Set(sessions),
      };
    });
  }

  async sessions(userId: number) {
    const found = await this.delegate.findUnique({
      where: { id: userId },
      select: { sessions: { select: { id: true } } },
    });

    return new Set(found?.sessions.map((s) => s.id));
  }

  async roles(userId: number) {
    const userRoles = await this.delegate.findUnique({
      where: { id: userId },
      select: {
        id: true,
        userRoles: { select: { id: true, role: { select: { name: true } } } },
      },
    });

    const rolesList = userRoles?.userRoles.map((r) => {
      return r.role.name;
    });

    return new Set(rolesList);
  }

  async permissions(userId: number): Promise<Set<string>> {
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

    const permissionList = foundPermissions?.userPermissions.map((p) => {
      const scopeName = p.permission.resource.scope.name;
      const resourceName = p.permission.resource.name;
      const operationName = p.permission.operation.name;

      return `${scopeName}.${resourceName}.${operationName}`;
    });

    return new Set(permissionList);
  }

  override async beforeUpsert<T extends UserCreateDto | UserUpdateDto>(
    data: T,
  ): Promise<T> {
    if (data.password !== undefined) {
      data.password = await this.cryptoService.hash(data.password);
    }

    return data;
  }

  override async beforeCreateAndUpdate<T extends UserCreateDto | UserUpdateDto>(
    data: T,
  ): Promise<T> {
    const errors = await this.isUniqueExist(data);
    if (errors && errors.length > 0) {
      throw new UnprocessableEntityException({ errors });
    }

    return await this.beforeUpsert(data);
  }
}
