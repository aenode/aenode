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

  protected async prepare<T extends UserCreateDto | UserUpdateDto>(
    data: T,
  ): Promise<T> {
    const errors = await this.service.isExist(data);
    if (errors) {
      throw new UnprocessableEntityException({ errors });
    }

    if (data.password) {
      return { ...data, password: await hash(data.password) };
    }
    return data;
  }

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
    return await this.service.createOne(await this.prepare(data));
  }

  @UserDecoratorFactory.UpdateOneById()
  async updateOneById(@ParamId() id: number, @Body() data: UserUpdateDto) {
    return await this.service.updateOneById(id, await this.prepare(data));
  }

  @UserDecoratorFactory.DeleteOneById()
  deleteOne(@ParamId() id: number) {
    return this.service.softDeleteOneById(id);
  }
}
