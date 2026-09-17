import { Prop } from '../decorators/index.js';

export function createQueryClass<T>(
  className: string,
  scalarFieldEnum: object,
) {
  class QueryClass {
    @Prop({ min: 1, default: 20, description: 'Take a number of items' })
    take: number;

    @Prop({ min: 0, default: 0, description: 'Skip a number of items' })
    skip: number;

    @Prop({ description: 'Search string' })
    search?: string;

    @Prop({ enum: scalarFieldEnum, description: 'Order by field' })
    orderBy: keyof T;

    @Prop({
      isIn: ['asc', 'desc'],
      default: 'asc',
      description: 'Order direction',
    })
    orderDir: string;
  }

  Object.defineProperty(QueryClass, 'name', {
    value: className,
  });

  return QueryClass;
}
