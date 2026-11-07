export type UserJwtData = {
  /**
   * Session id
   */
  sub: number;
};

export type ExtendedRequest = {
  user: UserJwtData;
  isPublic: boolean;
};
