import {
  RolePermissionCreateDto,
  RolePermissionFindManyDto,
  RolePermissionReadDto,
  RolePermissionUpdateDto,
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
import { RolePermissionService } from '../../data/index.js';

@ResouceController()
export class RolePermissionController {
  constructor(protected service: RolePermissionService) {}

  @FindMany({ responseType: RolePermissionReadDto })
  async findMany(@Query() query: RolePermissionFindManyDto) {
    return await this.service.findMany(query);
  }

  @FindOneById({ responseType: RolePermissionReadDto })
  async findOneById(@ParamId() id: number) {
    return await this.service.findUniqueOneById(id);
  }

  @CreateOne({ responseType: RolePermissionReadDto })
  async createOne(@Body() data: RolePermissionCreateDto) {
    return await this.service.createOne(data);
  }

  @UpdateOneById({ responseType: RolePermissionReadDto })
  async updateOneById(
    @ParamId() id: number,
    @Body() data: RolePermissionUpdateDto,
  ) {
    return await this.service.updateOneById(id, data);
  }

  @DeleteOneById({ responseType: RolePermissionReadDto })
  async deleteOne(@ParamId() id: number) {
    return await this.service.softDeleteOneById(id);
  }
}
