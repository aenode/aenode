import {
  SessionCreateDto,
  SessionFindManyDto,
  SessionReadDto,
  SessionUpdateDto,
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
import { SessionService } from '../../data/index.js';

@ResouceController()
export class SessionController {
  constructor(protected service: SessionService) {}

  @FindMany({ responseType: SessionReadDto })
  async findMany(@Query() query: SessionFindManyDto) {
    return await this.service.findMany(query);
  }

  @FindOneById({ responseType: SessionReadDto })
  async findOneById(@ParamId() id: number) {
    return await this.service.findUniqueOneById(id);
  }

  @CreateOne({ responseType: SessionReadDto })
  async createOne(@Body() data: SessionCreateDto) {
    return await this.service.createOne(data);
  }

  @UpdateOneById({ responseType: SessionReadDto })
  async updateOneById(@ParamId() id: number, @Body() data: SessionUpdateDto) {
    return await this.service.updateOneById(id, data);
  }

  @DeleteOneById({ responseType: SessionReadDto })
  async deleteOne(@ParamId() id: number) {
    return await this.service.softDeleteOneById(id);
  }
}
