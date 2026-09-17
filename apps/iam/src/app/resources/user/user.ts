import { Prisma } from '@aenode/iam-db';
import {
  Autowire,
  BaseDto,
  createQueryClass,
  PartialType,
  PickType,
  Prop,
} from '@aenode/nest';

export type UserDelegate = Prisma.UserDelegate;

export const UserModelName = 'User';
export const UserSingularPath = 'user';
export const UserPluralPath = 'users';

export const UserField = Prisma.UserScalarFieldEnum;
export type UserField = keyof typeof UserField;

export const UserSearchFields = [
  UserField.username,
  UserField.password,
] as const;

export const UserCreateFields = [
  UserField.username,
  UserField.password,
] as const;

export class UserQueryDto extends createQueryClass('UserQueryDto', UserField) {}

export class UserDto extends BaseDto {
  @Prop({ required: true, format: 'email' })
  username: string;

  @Prop({ required: true, format: 'password' })
  password: string;
}
export class UserCreateDto extends PickType(UserDto, UserCreateFields) {}

export class UserUpdateDto extends PartialType(UserCreateDto) {}

export function UserControllerDecorator(): ClassDecorator {
  return (target) => {
    Autowire({
      name: 'users',
      dto: UserDto,
      createDto: UserCreateDto,
      updateDto: UserUpdateDto,
    })(target);
  };
}

export function toUserSearchQuery(search: string | undefined) {
  return UserSearchFields.reduce(
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

export function toUserWhereObject(
  search: string | undefined,
): Prisma.UserWhereInput {
  return {
    deletedAt: null,
    ...toUserSearchQuery(search),
  };
}
