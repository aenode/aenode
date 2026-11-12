import type { Type } from '@aenode/nest/common';

export type MethodOptions = {
  responseType?: Type;

  /**
   * Emit the response by <ResourceName>.<OperationName>
   */
  emit?: boolean;

  emitAfter?: boolean;
  emitBefore?: boolean;

  /**
   * Operation summary
   */
  summary?: string;

  /**
   * By pass authentication
   */
  public?: boolean;
};
