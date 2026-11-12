import { extractResourceName, names } from '@aenode/names';
import { Controller } from '@aenode/nest/common';
import { ApiBearerAuth } from '@aenode/nest/swagger';
import { ResourceName } from '../metadata/resource-name.js';

export type ResourceControllerOptions = {
  resourcePath?: string;
  resourceName?: string;
};
export function ResouceController(
  options: ResourceControllerOptions = {},
): ClassDecorator {
  return (...args) => {
    const className = args[0].name;
    const resourceNameRaw =
      options.resourceName ?? extractResourceName(className);
    const resourcePathRaw = options.resourcePath ?? resourceNameRaw;

    const resourceName = names(resourceNameRaw).constant;
    const resourcePath = names(resourcePathRaw).kebab;

    ApiBearerAuth()(...args);
    ResourceName(resourceName)(...args);
    Controller(resourcePath)(...args);
  };
}
