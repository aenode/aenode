import { Injectable } from '@aenode/nest';
import { InjectPrismaDelegate } from '@aenode/prisma';
import { ScopeDelegateService } from '../../generated/dto/scope/scope.js';
import { Prisma } from '../../generated/prisma/client.js';

@Injectable()
export class ScopeService extends ScopeDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Scope)
    delegate: Prisma.ScopeDelegate,
  ) {
    super(delegate);
  }
}
