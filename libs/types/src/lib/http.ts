export type UserInfo = {
  id: number;
  uuid: string;
  username: string;
  isAdmin?: boolean;
  roles?: string[];
  permissions?: string[];
};
export type ExtendedRequest = {
  user: UserInfo;
};
