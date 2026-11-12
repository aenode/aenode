import { Prisma } from '@aenode/iam-db';
import {
  UserCreateDto,
  UserDelegateService,
  UserUpdateDto,
} from '@aenode/iam-db/nest';
import { HashService } from '@aenode/nest-hash';
import { InjectPrismaDelegate } from '@aenode/nest-prisma';
import { Injectable } from '@aenode/nest/common';
import type { UserWithRelations } from '../../auth/auth-user.js';

@Injectable()
export class UserService extends UserDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.User)
    delegate: Prisma.UserDelegate,
    protected readonly hashService: HashService,
  ) {
    super(delegate);
  }

  protected override async beforeCreateAndUpdate<
    T extends UserUpdateDto | UserCreateDto,
  >(data: T): Promise<T> {
    if (data.password) {
      return {
        ...data,
        password: await this.hashService.hashPassword(data.password),
      };
    }
    return data;
  }

  protected override beforeUpsert<T extends UserCreateDto | UserUpdateDto>(
    data: T,
  ): Promise<T> {
    return this.beforeCreateAndUpdate(data);
  }

  async findManyUsersWithRelations(): Promise<UserWithRelations[]> {
    return await this.delegate.findMany({
      where: { isActive: true },
      include: {
        otp: true,
        sessions: true,
        userPermissions: {
          include: { permission: true },
        },
        userRoles: {
          include: { role: true },
        },
      },
    });
  }
}
