import { Body, ParamId, Query } from '@aenode/nest';
import * as D from './scope.js';
import { ScopeService } from './scope.service.js';

@D.ScopeControllerDecorator()
export class ScopeController {
  constructor(protected readonly service: ScopeService) {}

  createOne(data: D.ScopeCreateDto) {
    return this.service.create(data);
  }

  findMany(@Query() query: D.ScopeQueryDto) {
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
