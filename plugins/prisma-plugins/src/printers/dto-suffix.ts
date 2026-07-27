export const DtoSuffix = {
  CreateDto: 'CreateDto',
  UpdateDto: 'UpdateDto',
  FindManyArgsDto: 'FindManyArgsDto',
  FindOneArgsDto: 'FindOneArgsDto',
  OrderByDto: 'OrderByDto',
  SelectDto: 'SelectDto',
  OmitDto: 'OmitDto',
  IncludeDto: 'IncludeDto',
  WhereDto: 'WhereDto',
  ListWhereDto: 'ListWhereDto',
};

export type DtoSuffix = keyof typeof DtoSuffix;
