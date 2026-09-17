import { Body, Query } from '@aenode/nest';
import type { CrudController } from '@aenode/nest/common';
import { Autowire, ParamId } from '@aenode/nest/decorators';
import * as D from './scope.dto.js';
import { ScopeService } from './scope.service.js';

@Autowire({
  name: 'scope',
  readDto: D.ScopeReadDto,
  createDto: D.ScopeCreateDto,
  updateDto: D.ScopeUpdateDto,
})
export class ScopeController implements CrudController {
  constructor(protected readonly service: ScopeService) {}

  createOne(data: D.ScopeCreateDto) {
    return this.service.create(data);
  }

  findMany(@Query() query: D.ScopeFindManyDto) {
    return this.service.findMany(query);
  }

  findOneById(@ParamId() id: number) {
    return this.service.findOneById(id);
  }

  updateOneById(@ParamId() id: number, @Body() data: D.ScopeUpdateDto) {
    return this.service.updateOneById(id, data);
  }

  deleteOneById(@ParamId() id: number) {
    return this.service.softDeleteOneById(id);
  }
}
