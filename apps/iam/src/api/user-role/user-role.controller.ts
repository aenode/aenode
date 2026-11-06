import {
  UserRoleCreateDto,
  UserRoleFindManyDto,
  UserRoleReadDto,
  UserRoleUpdateDto,
} from '@aenode/iam-db/nest';
import {
  CreateOne,
  FindMany,
  FindOneById,
  ParamId,
  ResouceController,
  DeleteOneById,
  UpdateOneById,
} from '@aenode/nest-decorators';
import { Body, Query } from '@aenode/nest/common';
import { UserRoleService } from '../../data/index.js';

@ResouceController()
export class UserRoleController {
  constructor(protected service: UserRoleService) {}

  @FindMany({ responseType: UserRoleReadDto })
  async findMany(@Query() query: UserRoleFindManyDto) {
    return await this.service.findMany(query);
  }

  @FindOneById({ responseType: UserRoleReadDto })
  async findOneById(@ParamId() id: number) {
    return await this.service.findUniqueOneById(id);
  }

  @CreateOne({ responseType: UserRoleReadDto })
  async createOne(@Body() data: UserRoleCreateDto) {
    return await this.service.createOne(data);
  }

  @UpdateOneById({ responseType: UserRoleReadDto })
  async updateOneById(@ParamId() id: number, @Body() data: UserRoleUpdateDto) {
    return await this.service.updateOneById(id, data);
  }

  @DeleteOneById({ responseType: UserRoleReadDto })
  async deleteOne(@ParamId() id: number) {
    return await this.service.softDeleteOneById(id);
  }
}
