import { InjectPrismaDelegate } from '@aenode/prisma';
import { Injectable } from '@nestjs/common';
import { ResourceDelegateService } from '../../generated/dto/resource/resource.js';
import { Prisma } from '../../generated/prisma/client.js';

@Injectable()
export class ResourceService extends ResourceDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Resource)
    delegate: Prisma.ResourceDelegate,
  ) {
    super(delegate);
  }
}
