import { InputType, PartialType } from '@aenode/nestjs/graphql';
import { AppCreateDto } from './app-create.dto.js';

@InputType()
export class AppUpdateDto extends PartialType(AppCreateDto) {}
