import { Prop } from '@aenode/nest-prop';

export class AuthUserSessionDto {
  @Prop() id: number;
  @Prop() userAgent: string;
  @Prop() ipAddress: string;
  @Prop() token: string;
  @Prop() userId: number;
}

export class AuthUserSessionCreateDto {
  @Prop() userAgent?: string;
  @Prop() ipAddress?: string;
  @Prop({ required: true }) token?: string;
  @Prop({ required: true }) deviceId?: string;
  @Prop({ required: true }) userId?: number;
}

export class AuthUserPermissionDto {
  @Prop() id: number;
  @Prop() name: string;
  @Prop() scopeId: number;
}

export class AuthUserRoleDto {
  @Prop() id: number;
  @Prop() name: string;
  @Prop({ type: () => AuthUserPermissionDto })
  permissions: AuthUserPermissionDto[];
}

export class AuthUserDto {
  @Prop() id: number;
  @Prop() uuid: string;
  @Prop() username: string;
  @Prop() password: string;
  @Prop() otpSecret: string;
  @Prop({ type: () => AuthUserRoleDto }) roles: AuthUserRoleDto[];
}
