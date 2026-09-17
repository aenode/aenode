import { Injectable } from '@aenode/nest';
import { InjectDelegate } from '@aenode/prisma/pg';
import * as D from './user.js';

@Injectable()
export class UserService {
  constructor(
    @InjectDelegate(D.UserModelName)
    protected readonly delegate: D.UserDelegate,
  ) {}

  async findMany(query: D.UserQueryDto) {
    const { orderBy, orderDir, skip, take, search } = query;
    const where = D.toUserWhereObject(search);
    const foundItems = await this.delegate.findMany({
      where,
      take,
      skip,
      orderBy: { [orderBy]: orderDir },
    });

    return foundItems;
  }

  async findOneById(id: number) {
    return await this.delegate.findUniqueOrThrow({ where: { id } });
  }

  create(data: D.UserCreateDto) {
    return this.delegate.create({ data });
  }

  updateOneById(id: number, data: D.UserUpdateDto) {
    return this.delegate.update({ where: { id }, data });
  }

  hardDeleteOneById(id: number) {
    return this.delegate.delete({ where: { id } });
  }

  softDeleteOneById(id: number) {
    return this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  resoverOneById(id: number) {
    return this.delegate.update({ where: { id }, data: { deletedAt: null } });
  }
}
