import { InjectPrismaDelegate } from '@aenode/prisma';
import { Injectable } from '@nestjs/common';
import { OperationDelegateService } from '../../generated/dto/operation/operation.js';
import { Prisma } from '../../generated/prisma/client.js';

@Injectable()
export class OperationService extends OperationDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Operation)
    delegate: Prisma.OperationDelegate,
  ) {
    super(delegate);
  }
}
