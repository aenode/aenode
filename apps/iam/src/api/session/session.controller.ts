import {
  Body,
  ParamId,
  QueryParam,
  ResourceDecoratorFactory,
} from '@aenode/nest';
import { SessionService } from '../../data/index.js';
import {
  SessionCreateDto,
  SessionFindManyDto,
  SessionReadDto,
  SessionUpdateDto,
} from '../../generated/dto/session/session.js';

const SessionDecoratorFactory = new ResourceDecoratorFactory({
  singularPath: 'session',
  pluralPath: 'sessions',
  responseType: SessionReadDto,
});

@SessionDecoratorFactory.Controller()
export class SessionController {
  constructor(protected service: SessionService) {}

  @SessionDecoratorFactory.FindMany()
  findMany(@QueryParam() query: SessionFindManyDto) {
    return this.service.findMany(query);
  }

  @SessionDecoratorFactory.FindOneById()
  findOneById(@ParamId() id: number) {
    return this.service.findUniqueOneById(id);
  }

  @SessionDecoratorFactory.CreateOne()
  createOne(@Body() data: SessionCreateDto) {
    return this.service.createOne(data);
  }

  @SessionDecoratorFactory.UpdateOneById()
  updateOneById(@ParamId() id: number, @Body() data: SessionUpdateDto) {
    return this.service.updateOneById(id, data);
  }

  @SessionDecoratorFactory.DeleteOneById()
  deleteOne(@ParamId() id: number) {
    return this.service.softDeleteOneById(id);
  }
}
