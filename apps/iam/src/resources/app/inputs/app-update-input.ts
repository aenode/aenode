import { InputType, PartialType } from '@aenode/nestjs/graphql';
import { AppCreateInput } from './app-create-input.js';

@InputType()
export class AppUpdateInput extends PartialType(AppCreateInput) {}
