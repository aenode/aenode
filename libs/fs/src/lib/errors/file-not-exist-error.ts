import { BaseFSError } from './base-fs-error.js';

export class FileNotExistError extends BaseFSError {
  constructor(path: string) {
    super(`The file, ${path}, does not exist`, { path });
  }
}
