import {
  EmailCreateDto,
  EmailFindManyDto,
  EmailReadDto,
  EmailUpdateDto,
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
import { EmailService } from '../../data/index.js';

@ResouceController()
export class EmailController {
  constructor(protected service: EmailService) {}

  @FindMany({ responseType: EmailReadDto })
  async findMany(@Query() query: EmailFindManyDto) {
    return await this.service.findMany(query);
  }

  @FindOneById({ responseType: EmailReadDto })
  async findOneById(@ParamId() id: number) {
    return await this.service.findUniqueOneById(id);
  }

  @CreateOne({ responseType: EmailReadDto })
  async createOne(@Body() data: EmailCreateDto) {
    return await this.service.createOne(data);
  }

  @UpdateOneById({ responseType: EmailReadDto })
  async updateOneById(@ParamId() id: number, @Body() data: EmailUpdateDto) {
    return await this.service.updateOneById(id, data);
  }

  @DeleteOneById({ responseType: EmailReadDto })
  async deleteOne(@ParamId() id: number) {
    return await this.service.softDeleteOneById(id);
  }
}
