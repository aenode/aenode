import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readYamlFile } from './read-yaml-file.js'; // Adjust path to your source file
import { readTextFile } from './read-text-file.js';
import { YAMLException } from 'js-yaml';

// 1. Mock the readTextFile module dependency
vi.mock('./read-text-file.js', () => ({
  readTextFile: vi.fn(),
}));

describe('readYamlFile()', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('Happy Path', () => {
    it('should successfully parse a valid YAML file into an object', async () => {
      const mockYaml = `
        name: vnodes-cli
        version: 1.0.0
        active: true
      `;
      // Arrange the file read to return our raw mock string
      vi.mocked(readTextFile).mockResolvedValue(mockYaml);

      // Act
      interface MockConfig {
        name: string;
        version: string;
        active: boolean;
      }
      const result = await readYamlFile<MockConfig>('config.yaml');

      // Assert
      expect(readTextFile).toHaveBeenCalledWith('config.yaml', undefined);
      expect(result).toEqual({
        name: 'vnodes-cli',
        version: '1.0.0',
        active: true,
      });
    });

    it('should handle nested structures and arrays correctly', async () => {
      const mockYaml = `
        environment: production
        databases:
          - postgres
          - redis
      `;
      vi.mocked(readTextFile).mockResolvedValue(mockYaml);

      const result = await readYamlFile<any>('config.yaml');

      expect(result).toEqual({
        environment: 'production',
        databases: ['postgres', 'redis'],
      });
    });
  });

  describe('Error Handling & Core Behavior', () => {
    it('should throw a YAMLException if the text content is invalid YAML syntax', async () => {
      // Missing indentation/malformed content that breaks YAML rules
      const malformedYaml = `
        key: value
        nested
          broken: string
      `;
      vi.mocked(readTextFile).mockResolvedValue(malformedYaml);

      // Assert that it bubbles up the js-yaml package parser exception
      await expect(readYamlFile('invalid.yaml')).rejects.toThrow(YAMLException);
    });

    it('should forward the AbortController signal down to readTextFile', async () => {
      vi.mocked(readTextFile).mockResolvedValue('key: value');
      const controller = new AbortController();

      await readYamlFile('config.yaml', controller);

      // Explicitly check that the identical signal instance was passed down
      expect(readTextFile).toHaveBeenCalledWith('config.yaml', controller);
    });

    it('should bubble up the error if readTextFile rejects (e.g., File Not Found)', async () => {
      // Simulate file system missing error
      const fsError = new Error('ENOENT: no such file or directory');
      vi.mocked(readTextFile).mockRejectedValue(fsError);

      await expect(readYamlFile('missing.yaml')).rejects.toThrow('ENOENT: no such file or directory');
    });
  });
});
