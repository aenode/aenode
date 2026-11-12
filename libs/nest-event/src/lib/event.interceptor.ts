import {
  getOperationName,
  getResourceName,
  isEmit,
  isEmitInput,
  isEmitOutput,
} from '@aenode/nest-decorators';
import {
  Injectable,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@aenode/nest/common';
import { Reflector } from '@aenode/nest/core';
import { EventEmitter2 } from '@aenode/nest/emitter';
import { type Request, type Response } from '@aenode/nest/express';
import { map, type Observable } from '@aenode/nest/rxjs';

@Injectable()
export class EventInterceptor implements NestInterceptor {
  constructor(
    protected readonly emitter: EventEmitter2,
    protected readonly reflector: Reflector,
  ) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<Response>,
  ): Observable<Response> | Promise<Observable<Response>> {
    const resourceName = getResourceName(context, this.reflector);
    const operationName = getOperationName(context, this.reflector);
    const emited = isEmit(context, this.reflector);
    const emitInput = isEmitInput(context, this.reflector);
    const emitOutput = isEmitOutput(context, this.reflector);
    const eventName = `${resourceName}.${operationName}`;

    const inputEventName = `${eventName}.INPUT`;
    const outputEventName = `${eventName}.OUTPUT`;

    const req = context.switchToHttp().getRequest<Request>();

    if (emited === true || emitInput === true) {
      const data = {
        url: req.url,
        body: { ...req.body },
        query: { ...req.query },
        params: { ...req.params },
      };

      this.emitter.emit(inputEventName, data);
    }

    return next.handle().pipe(
      map((data) => {
        if (emited === true || emitOutput === true) {
          this.emitter.emit(outputEventName, data);
        }
        return data;
      }),
    );
  }
}
