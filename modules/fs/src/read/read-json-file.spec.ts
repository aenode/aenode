import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readJsonFile } from './read-json-file.js'; // Adjust path to your source file
import { readTextFile } from './read-text-file.js';

// 1. Mock the readTextFile dependency
vi.mock('./read-text-file.js', () => ({
  readTextFile: vi.fn(),
}));

describe('readJsonFile()', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('Happy Path', () => {
    it('should successfully parse valid JSON into a typed object', async () => {
      const mockJson = '{"name": "vnodes", "version": 2, "isAwesome": true}';
      vi.mocked(readTextFile).mockResolvedValue(mockJson);

      interface Config {
        name: string;
        version: number;
        isAwesome: boolean;
      }
      const result = await readJsonFile<Config>('config.json');

      expect(readTextFile).toHaveBeenCalledWith('config.json', undefined);
      expect(result).toEqual({
        name: 'vnodes',
        version: 2,
        isAwesome: true,
      });
    });

    it('should parse primitive JSON values if expected (e.g., arrays)', async () => {
      const mockJsonArray = '["node", "typescript", "angular"]';
      vi.mocked(readTextFile).mockResolvedValue(mockJsonArray);

      const result = await readJsonFile<string[]>('tags.json');

      expect(result).toEqual(['node', 'typescript', 'angular']);
    });
  });

  describe('Error Handling & Core Behavior', () => {
    it('should throw a SyntaxError if the string content is malformed JSON', async () => {
      // Intentionally invalid JSON structure (trailing comma, unquoted keys, etc.)
      const brokenJson = '{ name: missing-quotes, }';
      vi.mocked(readTextFile).mockResolvedValue(brokenJson);

      // Assert that standard JSON.parse parsing failure bubbles up
      await expect(readJsonFile('invalid.json')).rejects.toThrow(SyntaxError);
    });

    it('should forward the AbortController signal directly to readTextFile', async () => {
      vi.mocked(readTextFile).mockResolvedValue('{}');
      const controller = new AbortController();

      await readJsonFile('config.json', controller);

      expect(readTextFile).toHaveBeenCalledWith('config.json', controller);
    });

    it('should bubble up the rejection if readTextFile fails', async () => {
      const missingFileError = new Error('ENOENT: no such file or directory');
      vi.mocked(readTextFile).mockRejectedValue(missingFileError);

      await expect(readJsonFile('missing.json')).rejects.toThrow('ENOENT: no such file or directory');
    });
  });
});
