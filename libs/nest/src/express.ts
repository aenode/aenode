export type { Request, Response } from 'express';

export type ExtendedRequest = Request & {
  user: {
    username: string;
    id: number;
    uuid: string;
    roles: string[];
    permissions: string[];
  };
};
