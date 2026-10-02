import { Prop } from '@aenode/nest-prop';

export class AuthUserPermissionDto {
  @Prop() name: string;
  @Prop() scopeId: number;
}

export class AuthUserRoleDto {
  @Prop() name: string;
  @Prop({ type: () => AuthUserPermissionDto })
  permissions: AuthUserPermissionDto[];
}

export class AuthUserDto {
  @Prop() uuid: string;
  @Prop() username: string;
  @Prop() password: string;
  @Prop() otpSecret: string;
  @Prop({ type: () => AuthUserRoleDto }) roles: AuthUserRoleDto[];
}
