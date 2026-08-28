import { Env } from '@aenode/env';

import Database, { type Database as DatabaseType } from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

export interface DbConfig {
  dbPath: string;
  readonly?: boolean;
  fileMustExist?: boolean;
  verbose?:
    | boolean
    | ((message?: unknown, ...additionalArgs: unknown[]) => void);
}

export function configureSqlite(config: DbConfig): DatabaseType {
  // 1. Ensure directory exists before initialization
  const dir = path.dirname(config.dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // 2. Instantiate with core connection options
  const db = new Database(config.dbPath, {
    readonly: config.readonly ?? false,
    fileMustExist: config.fileMustExist ?? false,
    timeout: Env.D_5_SECONDS,

    verbose: (message) => {
      console.log(message);
    },
  });

  // 3. Apply Production Pragmas
  configureSqlitePragmas(db);

  // 4. Register Process Termination Handlers to prevent corrupt WAL files
  registerSqliteShutdownHooks(db);

  return db;
}

export function configureSqlitePragmas(db: DatabaseType): void {
  // Enables Write-Ahead Logging. Allows concurrent reads while a write is occurring.
  db.pragma('journal_mode = WAL');

  // In WAL mode, 'NORMAL' synchronous is crash-safe and 10x+ faster than 'FULL'.
  // It guarantees database safety across app crashes and power failures.
  db.pragma('synchronous = NORMAL');

  // Allocate 64MB to memory cache (negative number denotes kilobytes: -64000)
  db.pragma('cache_size = -64000');

  // Memory-mapped I/O size (2GB). Allows reading pages directly from system RAM.
  db.pragma('mmap_size = 2147483648');

  // Cap WAL file size at ~6MB. Prevents checkpoint starvation and disk bloat.
  db.pragma('journal_size_limit = 6144000');

  // Keep temporary tables and indices entirely in RAM.
  db.pragma('temp_store = MEMORY');

  // Wait up to 5000ms for busy write locks at the engine level
  db.pragma('busy_timeout = 5000');

  // Enforce foreign key constraints (Disabled by default in SQLite)
  db.pragma('foreign_keys = ON');
}

export function registerSqliteShutdownHooks(db: DatabaseType): void {
  const gracefulShutdown = () => {
    if (db.open) {
      try {
        // Optimize and checkpoint remaining WAL frames before exit
        db.pragma('wal_checkpoint(TRUNCATE)');
        db.close();
      } catch (err) {
        console.error('Error closing SQLite connection:', err);
      }
    }
  };

  process.once('SIGINT', gracefulShutdown);
  process.once('SIGTERM', gracefulShutdown);
}
