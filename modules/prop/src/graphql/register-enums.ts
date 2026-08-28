import { SortOrder } from '@aenode/types';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(SortOrder, {
  name: 'SortOrder',
});
