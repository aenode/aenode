import type { ApiPropertyOptions } from '@nestjs/swagger';

import { type PropValidationOptions } from '@aenode/prop-validation';

export type PropOptions = PropValidationOptions & ApiPropertyOptions;
