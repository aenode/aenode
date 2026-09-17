import { Prisma } from '@aenode/iam-db';
import {
  Autowire,
  BaseDto,
  createQueryClass,
  PartialType,
  PickType,
  Prop,
} from '@aenode/nest';

export type ScopeDelegate = Prisma.ScopeDelegate;

export const ScopeModelName = 'Scope';
export const ScopeSingularPath = 'scope';
export const ScopePluralPath = 'scopes';

export const ScopeField = Prisma.ScopeScalarFieldEnum;
export type ScopeField = keyof typeof ScopeField;

export const ScopeSearchFields = [
  ScopeField.name,
  ScopeField.description,
] as const;

export const ScopeCreateFields = [
  ScopeField.name,
  ScopeField.description,
] as const;

export class ScopeQueryDto extends createQueryClass(
  'ScopeQueryDto',
  ScopeField,
) {}

export class ScopeDto extends BaseDto {
  @Prop({
    required: true,
    format: 'name',
    description: 'Unique scope name',
    example: 'iam',
  })
  name: string;

  @Prop({
    maxLength: 400,
    description: 'Scope description',
    example: 'Identity and access management',
  })
  description: string;
}
export class ScopeCreateDto extends PickType(ScopeDto, ScopeCreateFields) {}

export class ScopeUpdateDto extends PartialType(ScopeCreateDto) {}

export function ScopeControllerDecorator(): ClassDecorator {
  return (target) => {
    Autowire({
      name: 'scopes',
      dto: ScopeDto,
      createDto: ScopeCreateDto,
      updateDto: ScopeUpdateDto,
    })(target);
  };
}

export function toScopeSearchQuery(search: string | undefined) {
  return ScopeSearchFields.reduce(
    (acc, s) => {
      acc[s] = {
        contains: search,
        mode: 'insensitive',
      } as Prisma.StringFilter;
      return acc;
    },
    {} as Record<string, Prisma.StringFilter>,
  );
}

export function toScopeWhereObject(
  search: string | undefined,
): Prisma.ScopeWhereInput {
  return {
    deletedAt: null,
    ...toScopeSearchQuery(search),
  };
}
