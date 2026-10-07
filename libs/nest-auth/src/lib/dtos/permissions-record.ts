export type PermissionRecord = {
  [scopeName: string]: {
    [resource: string]: {
      [operation: string]: boolean;
    };
  };
};
