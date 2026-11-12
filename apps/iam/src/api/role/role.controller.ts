import {
  RoleCreateDto,
  RoleFindManyDto,
  RoleReadDto,
  RoleUpdateDto,
} from '@aenode/iam-db/nest';
import {
  CreateOne,
  DeleteOneById,
  FindMany,
  FindOneById,
  OnEventInput,
  ParamId,
  ResouceController,
  UpdateOneById,
} from '@aenode/nest-decorators';
import { Body, Query } from '@aenode/nest/common';
import { RoleService } from '../../data/index.js';

@ResouceController()
export class RoleController {
  constructor(protected service: RoleService) {}

  @OnEventInput()
  onWriteOne(data: any) {
    console.log(data);
  }

  @FindMany({ responseType: RoleReadDto })
  async findMany(@Query() query: RoleFindManyDto) {
    return await this.service.findMany(query);
  }

  @FindOneById({ responseType: RoleReadDto })
  async findOneById(@ParamId() id: number) {
    return await this.service.findUniqueOneById(id);
  }

  @CreateOne({ responseType: RoleReadDto, emit: true })
  async createOne(@Body() data: RoleCreateDto) {
    return await this.service.createOne(data);
  }

  @UpdateOneById({ responseType: RoleReadDto })
  async updateOneById(@ParamId() id: number, @Body() data: RoleUpdateDto) {
    return await this.service.updateOneById(id, data);
  }

  @DeleteOneById({ responseType: RoleReadDto })
  async deleteOne(@ParamId() id: number) {
    return await this.service.softDeleteOneById(id);
  }
}
