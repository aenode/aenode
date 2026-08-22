import { AccessDeniedError } from '@aenode/errors';
import { join, resolve as nodeResolve } from 'node:path';
import { scope } from './scope.js';

describe('scope()', () => {
  // Define a stable root directory for testing
  const mockRoot = nodeResolve('/users/dev/project');

  it('should return a function when initialized', () => {
    const resolver = scope(mockRoot);
    expect(typeof resolver).toBe('function');
  });

  describe('Happy Path (Allowed Access)', () => {
    it('should resolve a direct child file accurately', () => {
      const resolver = scope(mockRoot);
      const target = join(mockRoot, 'package.json');

      expect(resolver(target)).toBe(target);
    });

    it('should resolve deep subdirectories within the scope', () => {
      const resolver = scope(mockRoot);
      const target = join(mockRoot, 'src', 'utils', 'index.ts');

      expect(resolver(target)).toBe(target);
    });

    it('should allow resolving the exact root directory path', () => {
      const resolver = scope(mockRoot);

      expect(resolver(mockRoot)).toBe(mockRoot);
    });

    it('should handle relative traversal that safely resolves inside the root', () => {
      const resolver = scope(mockRoot);
      // /users/dev/project/src/../src/index.ts -> stays within root
      const target = join(mockRoot, 'src', '..', 'src', 'index.ts');
      const expected = nodeResolve(target);

      expect(resolver(target)).toBe(expected);
    });
  });

  describe('Security Edge Cases (Access Denied)', () => {
    it('should throw an error if a path attempts to escape via parent directory traversal (../)', () => {
      const resolver = scope(mockRoot);
      const maliciousPath = join(mockRoot, '..', 'secrets.txt'); // /users/dev/secrets.txt

      expect(() => resolver(maliciousPath)).toThrowError(AccessDeniedError);
    });

    it('should block absolute paths that point entirely outside the scoped root', () => {
      const resolver = scope(mockRoot);
      const outsidePath = nodeResolve('/etc/passwd');

      expect(() => resolver(outsidePath)).toThrow(AccessDeniedError);
    });

    it('should thwart partial-directory prefix matching exploits', () => {
      const resolver = scope(mockRoot);

      // If mockRoot is '/users/dev/project', this resolves to '/users/dev/project-secrets/env'
      // This catches the 'startsWith' flaw where 'project-secrets' starts with 'project'
      const exploitPath = nodeResolve(mockRoot + '-secrets', 'env');

      expect(() => resolver(exploitPath)).toThrow(AccessDeniedError);
    });

    it('should deny access to the root directory’s direct parent folder', () => {
      const resolver = scope(mockRoot);
      const parentPath = nodeResolve(mockRoot, '..'); // /users/dev

      expect(() => resolver(parentPath)).toThrow(AccessDeniedError);
    });
  });

  describe('Multi-segment Resolution', () => {
    it('should correctly join and validate multiple path segments passed to the resolver', () => {
      const resolver = scope(mockRoot);
      const expected = join(mockRoot, 'src', 'components', 'Button.tsx');

      // Simulating passing separate arguments: resolver('src', 'components', 'Button.tsx')
      expect(resolver(mockRoot, 'src', 'components', 'Button.tsx')).toBe(
        expected,
      );
    });

    it('should reject if multi-segment arguments eventually resolve outside the scope', () => {
      const resolver = scope(mockRoot);

      expect(() => resolver(mockRoot, '..', '..', 'outside-folder')).toThrow(
        AccessDeniedError,
      );
    });
  });
});
