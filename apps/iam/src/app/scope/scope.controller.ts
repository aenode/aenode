import { Body, Query } from '@aenode/nest';
import { Autowire, ParamId } from '@aenode/nest/decorators';
import { ScopeCreateDto, ScopeReadDto, ScopeUpdateDto } from './scope.input.js';
import { ScopeQueryDto } from './scope.query.js';
import { ScopeService } from './scope.service.js';

@Autowire({
  name: 'scope',
  readDto: ScopeReadDto,
  createDto: ScopeCreateDto,
  updateDto: ScopeUpdateDto,
})
export class ScopeController {
  constructor(protected readonly service: ScopeService) {}

  createOne(@Body() data: ScopeCreateDto) {
    return this.service.create(data);
  }

  findMany(@Query() query: ScopeQueryDto) {
    return this.service.findMany(query);
  }

  findOneById(@ParamId() id: number) {
    return this.service.findOneById(id);
  }

  updateOneById(@ParamId() id: number, @Body() data: ScopeUpdateDto) {
    return this.service.updateOneById(id, data);
  }

  deleteOneById(@ParamId() id: number) {
    return this.service.softDeleteOneById(id);
  }
}
