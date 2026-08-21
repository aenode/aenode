import { readFile } from 'node:fs/promises';
import { readTextFile } from './read-text-file.js';
import { vi } from 'vitest';

// 1. Mock the readTextFile dependency
vi.mock('fs/promises', () => ({
  readFile: vi.fn(),
}));

describe('readTextFile', () => {
  beforeAll(() => {
    vi.resetAllMocks();
  });

  it('should read text file', async () => {
    const mockValue = 'Some content';
    const filePath = 'file.txt';
    vi.mocked(readFile).mockResolvedValue(mockValue);
    const result = await readTextFile(filePath);

    expect(readFile).toHaveBeenCalledWith(filePath, {
      encoding: 'utf-8',
      signal: undefined,
    });
    expect(result).toEqual(mockValue);
  });
});
