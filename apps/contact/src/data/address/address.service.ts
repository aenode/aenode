import { Prisma } from '@aenode/contact-db';
import { AddressDelegateService } from '@aenode/contact-db/nest';
import { InjectPrismaDelegate } from '@aenode/nest-prisma';
import { Injectable } from '@aenode/nest/common';

@Injectable()
export class AddressService extends AddressDelegateService {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.Address)
    delegate: Prisma.AddressDelegate,
  ) {
    super(delegate);
  }
}
