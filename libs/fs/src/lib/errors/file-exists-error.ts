import { BaseFSError } from './base-fs-error.js';

export class FileExistsError extends BaseFSError {
  constructor(path: string) {
    super(`The file, ${path}, exists`, { path });
  }
}
