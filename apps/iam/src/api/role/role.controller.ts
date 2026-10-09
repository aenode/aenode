import {
  Body,
  ParamId,
  QueryParam,
  ResourceDecoratorFactory,
} from '@aenode/nest';
import { RoleService } from '../../data/index.js';
import {
  RoleCreateDto,
  RoleFindManyDto,
  RoleReadDto,
  RoleUpdateDto,
} from '../../generated/dto/role/role.js';

const RoleDecoratorFactory = new ResourceDecoratorFactory({
  resourceName: 'role',
  responseType: RoleReadDto,
});

@RoleDecoratorFactory.Controller()
export class RoleController {
  constructor(protected service: RoleService) {}

  @RoleDecoratorFactory.FindMany()
  findMany(@QueryParam() query: RoleFindManyDto) {
    return this.service.findMany(query);
  }

  @RoleDecoratorFactory.FindOneById()
  findOneById(@ParamId() id: number) {
    return this.service.findUniqueOneById(id);
  }

  @RoleDecoratorFactory.CreateOne()
  createOne(@Body() data: RoleCreateDto) {
    return this.service.createOne(data);
  }

  @RoleDecoratorFactory.UpdateOneById()
  updateOneById(@ParamId() id: number, @Body() data: RoleUpdateDto) {
    return this.service.updateOneById(id, data);
  }

  @RoleDecoratorFactory.DeleteOneById()
  deleteOne(@ParamId() id: number) {
    return this.service.softDeleteOneById(id);
  }
}
