import {
  Body,
  ParamId,
  QueryParam,
  ResourceDecoratorFactory,
} from '@aenode/nest';
import { InjectPrismaDelegate } from '@aenode/prisma';
import {
  UserCreateDto,
  UserFindManyDto,
  UserReadDto,
  UserUpdateDto,
} from '../../generated/dto/user/user.dto.js';
import { Prisma } from '../../generated/prisma/client.js';

const UserDecoratorFactory = new ResourceDecoratorFactory({
  singularPath: 'user',
  pluralPath: 'users',
  responseType: UserReadDto,
});

@UserDecoratorFactory.Controller()
export class UserController {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.User)
    protected readonly delegate: Prisma.UserDelegate,
  ) {}

  @UserDecoratorFactory.FindMany()
  findMany(@QueryParam() query: UserFindManyDto) {
    console.log(query);
    return this.delegate.findMany({ ...query });
  }

  @UserDecoratorFactory.FindOneById()
  findOneById(@ParamId() id: number) {
    return this.delegate.findUnique({ where: { id } });
  }
  @UserDecoratorFactory.CreateOne()
  createOne(@Body() data: UserCreateDto) {
    return this.delegate.create({ data });
  }

  @UserDecoratorFactory.UpdateOneById()
  updateOne(@ParamId() id: number, @Body() data: UserUpdateDto) {
    return this.delegate.update({ where: { id }, data });
  }

  @UserDecoratorFactory.DeleteOneById()
  deleteOne(@ParamId() id: number) {
    return this.delegate.update({ where: { id }, data: { isActive: false } });
  }
}
