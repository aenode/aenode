import { SortOrder } from '@aenode/types';
import { registerEnumType } from '@nestjs/graphql';
import { QueryMode } from './filter-dtos.js';

registerEnumType(SortOrder, {
  name: 'SortOrder',
});

registerEnumType(QueryMode, {
  name: 'QueryMode',
});
