import { Body, ParamId, Query } from '@aenode/nest';
import * as D from './user.js';
import { UserService } from './user.service.js';

@D.UserControllerDecorator()
export class UserController {
  constructor(protected readonly service: UserService) {}

  createOne(@Body() data: D.UserCreateDto) {
    return this.service.create(data);
  }

  findMany(@Query() query: D.UserQueryDto) {
    return this.service.findMany(query);
  }

  findOneById(@ParamId() id: number) {
    return this.service.findOneById(id);
  }

  updateOneById(@ParamId() id: number, @Body() data: D.UserUpdateDto) {
    return this.service.updateOneById(id, data);
  }

  deleteOneById(@ParamId() id: number) {
    return this.service.softDeleteOneById(id);
  }
}
