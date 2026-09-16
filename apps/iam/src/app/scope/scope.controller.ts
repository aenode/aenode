import { Body, Param, ParseIntPipe } from '@aenode/nest';
import { ResourceDecorator } from '@aenode/nest/decorators';
import { ScopeCreateDto, ScopeDto, ScopeUpdateDto } from './scope.input.js';
import { ScopeService } from './scope.service.js';

const C = new ResourceDecorator({
  name: 'scope',
  readDto: ScopeDto,
  createDto: ScopeCreateDto,
  updateDto: ScopeUpdateDto,
});

@C.Controller()
export class ScopeController {
  constructor(protected readonly service: ScopeService) {}

  @C.PostOne()
  createOne(@Body() data: ScopeCreateDto) {
    return this.service.create(data);
  }

  @C.GetMany()
  findMany() {
    return this.service.findMany();
  }

  @C.GetOneById()
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOneById(id);
  }

  @C.PutOneById()
  updateOneById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ScopeUpdateDto,
  ) {
    return this.service.updateOneById(id, data);
  }

  @C.DeleteOneById()
  deleteOneById(@Param('id', ParseIntPipe) id: number) {
    return this.service.softDeleteOneById(id);
  }
}
