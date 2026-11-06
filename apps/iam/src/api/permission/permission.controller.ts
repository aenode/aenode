import {
  PermissionCreateDto,
  PermissionFindManyDto,
  PermissionReadDto,
  PermissionUpdateDto,
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
import { PermissionService } from '../../data/index.js';

@ResouceController()
export class PermissionController {
  constructor(protected service: PermissionService) {}

  @FindMany({ responseType: PermissionReadDto })
  async findMany(@Query() query: PermissionFindManyDto) {
    return await this.service.findMany(query);
  }

  @FindOneById({ responseType: PermissionReadDto })
  async findOneById(@ParamId() id: number) {
    return await this.service.findUniqueOneById(id);
  }

  @CreateOne({ responseType: PermissionReadDto })
  async createOne(@Body() data: PermissionCreateDto) {
    return await this.service.createOne(data);
  }

  @UpdateOneById({ responseType: PermissionReadDto })
  async updateOneById(
    @ParamId() id: number,
    @Body() data: PermissionUpdateDto,
  ) {
    return await this.service.updateOneById(id, data);
  }

  @DeleteOneById({ responseType: PermissionReadDto })
  async deleteOne(@ParamId() id: number) {
    return await this.service.softDeleteOneById(id);
  }
}
