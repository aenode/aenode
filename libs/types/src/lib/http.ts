export type UserData = {
  id: number;
  uuid: string;
  username: string;
  isAdmin?: boolean;
  password: string;
  roles?: Set<string>;
  permissions?: Set<string>;
};

export type SessionData = {
  id: number;
  userId: number;
  deviceUUID: string;
  agent?: string;
};

export type UserJwtData = {
  /**
   * User id
   */
  sub: number;
};

export type ExtendedRequest = {
  user: UserJwtData;
  isPublic: boolean;
};
