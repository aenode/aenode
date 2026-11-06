import {
  OtpCreateDto,
  OtpFindManyDto,
  OtpReadDto,
  OtpUpdateDto,
} from '@aenode/iam-db/nest';
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
import { OtpService } from '../../data/index.js';

@ResouceController()
export class OtpController {
  constructor(protected service: OtpService) {}

  @FindMany({ responseType: OtpReadDto })
  async findMany(@Query() query: OtpFindManyDto) {
    return await this.service.findMany(query);
  }

  @FindOneById({ responseType: OtpReadDto })
  async findOneById(@ParamId() id: number) {
    return await this.service.findUniqueOneById(id);
  }

  @CreateOne({ responseType: OtpReadDto })
  async createOne(@Body() data: OtpCreateDto) {
    return await this.service.createOne(data);
  }

  @UpdateOneById({ responseType: OtpReadDto })
  async updateOneById(@ParamId() id: number, @Body() data: OtpUpdateDto) {
    return await this.service.updateOneById(id, data);
  }

  @DeleteOneById({ responseType: OtpReadDto })
  async deleteOne(@ParamId() id: number) {
    return await this.service.softDeleteOneById(id);
  }
}
