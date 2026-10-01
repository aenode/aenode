import { hash } from '@aenode/crypto';
import {
  Body,
  ParamId,
  QueryParam,
  ResourceDecoratorFactory,
  UnprocessableEntityException,
} from '@aenode/nest';
import { UserService } from '../../data/index.js';
import {
  UserCreateDto,
  UserFindManyDto,
  UserReadDto,
  UserUpdateDto,
} from '../../generated/dto/user/user.js';

const UserDecoratorFactory = new ResourceDecoratorFactory({
  singularPath: 'user',
  pluralPath: 'users',
  responseType: UserReadDto,
});

@UserDecoratorFactory.Controller()
export class UserController {
  constructor(protected service: UserService) {}

  @UserDecoratorFactory.FindMany()
  findMany(@QueryParam() query: UserFindManyDto) {
    return this.service.findMany(query);
  }

  @UserDecoratorFactory.FindOneById()
  findOneById(@ParamId() id: number) {
    return this.service.findUniqueOneById(id);
  }

  @UserDecoratorFactory.CreateOne()
  async createOne(@Body() data: UserCreateDto) {
    const errors = await this.service.isExist(data);
    if (errors) {
      throw new UnprocessableEntityException({ errors });
    }
    const hashedPassword = await hash(data.password);
    return await this.service.createOne({ ...data, password: hashedPassword });
  }

  @UserDecoratorFactory.UpdateOneById()
  updateOneById(@ParamId() id: number, @Body() data: UserUpdateDto) {
    return this.service.updateOneById(id, data);
  }

  @UserDecoratorFactory.DeleteOneById()
  deleteOne(@ParamId() id: number) {
    return this.service.softDeleteOneById(id);
  }
}
