import { Prisma } from '@aenode/iam-db/client';
import { Injectable } from '@aenode/nest';
import { InjectDelegate } from '@aenode/prisma/pg';
import type { ScopeCreateDto } from './scope.input.js';

@Injectable()
export class ScopeService {
  constructor(
    @InjectDelegate(Prisma.ModelName.Scope)
    protected readonly delegate: Prisma.ScopeDelegate,
  ) {}

  async findMany() {
    const result = await this.delegate.findMany({
      where: { deletedAt: null },
      select: { id: true, name: true },
    });

    return result;
  }

  async findOneById(id: number) {
    return await this.delegate.findUniqueOrThrow({ where: { id } });
  }

  create(data: ScopeCreateDto) {
    return this.delegate.create({ data });
  }

  updateOneById(id: number, data: Prisma.ScopeUpdateInput) {
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
