import {
  UserCreateDto,
  UserFindManyDto,
  UserReadDto,
  UserUpdateDto,
} from '@aenode/contact-db/nest';
import {
  CreateOne,
  DeleteOneById,
  FindMany,
  FindOneById,
  ParamId,
  ResouceController,
  UpdateOneById,
} from '@aenode/nest-decorators';
import { Body, Query } from '@aenode/nest/common';
import { UserService } from '../../data/index.js';

@ResouceController()
export class UserController {
  constructor(protected service: UserService) {}

  @FindMany({ responseType: UserReadDto })
  async findMany(@Query() query: UserFindManyDto) {
    return await this.service.findMany(query);
  }

  @FindOneById({ responseType: UserReadDto })
  async findOneById(@ParamId() id: number) {
    return await this.service.findUniqueOneById(id);
  }

  @CreateOne({ responseType: UserReadDto })
  async createOne(@Body() data: UserCreateDto) {
    return await this.service.createOne(data);
  }

  @UpdateOneById({ responseType: UserReadDto })
  async updateOneById(@ParamId() id: number, @Body() data: UserUpdateDto) {
    return await this.service.updateOneById(id, data);
  }

  @DeleteOneById({ responseType: UserReadDto })
  async deleteOne(@ParamId() id: number) {
    return await this.service.softDeleteOneById(id);
  }
}
