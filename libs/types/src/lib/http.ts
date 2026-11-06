export type UserData = {
  id: number;
  uuid: string;
  username: string;
  isAdmin?: boolean;
  password: string;
  roles?: Set<string>;
  permissions?: Set<string>;
};

export type UserJwtData = { sub: number; uuid: string };

export type ExtendedRequest = {
  user: UserJwtData;
  isPublic: boolean;
};
