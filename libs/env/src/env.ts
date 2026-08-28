export class EnvApp {
  static readonly NAME = 'APP_NAME';
  static readonly PORT = 'APP_PORT';
  static readonly JWT = 'APP_JWT';
  static readonly USERANME = 'APP_USERANME';
  static readonly PASSWORD = 'APP_PASSWORD';
  static readonly PROFILE = 'APP_PROFILE';
}

export class EnvDBPool {
  /**
   * The maximum number of clients/connections allowed in this pool.	Default is usually 10. Don't set this higher than your PostgreSQL server's max_connections limit.
   */
  static readonly MAX = 'DB_POOL_MAX';

  /**
   * How long (in milliseconds) a request will wait to acquire an available client from the pool before throwing a timeout error.	Default is 0 (wait indefinitely). In production, set this (e.g., 5000 ms) to prevent requests from hanging indefinitely during high traffic spikes.
   */
  static readonly CONNECTION_TIMEOUT_MILLIS =
    'DB_POOL_CONNECTION_TIMEOUT_MILLIS';

  /**
   * How long (in milliseconds) a connection can sit unused in the pool before being closed and discarded.	Default is usually 10000 (10 seconds). Keeps connection counts low during quiet periods.
   */
  static readonly IDLE_TIMEOUT_MILLIS = 'DB_POOL_IDLE_TIMEOUT_MILLIS';

  /**
   * The maximum number of times a single connection can be checked out and reused before the pool closes and replaces it.	Default is 0 (unlimited). Useful to set (e.g., 7500) to mitigate subtle memory leaks or clean up stale session-level state in long-lived node processes.
   */
  static readonly MAX_USES = 'DB_POOL_MAX_USES';

  /**
   * Aborts any individual SQL statement that takes longer than the specified number of milliseconds.	Your primary circuit breaker. Prevents runaway, un-indexed, or slow queries from bogging down your database. 5000 miliseconds is ideal
   */
  static readonly STATEMENT_TIMEOUT = 'DB_POOL_STATEMENT_TIMEOUT';

  /**
   * Node-side timeout for a query to complete before the driver rejects the Promise.	Acts as a client-side backup if the network connection drops while waiting for Postgres to return results.
   */
  static readonly QUERY_TIMEOUT = 'DB_POOL_QUERY_TIMEOUT';

  /**
   * Aborts any statement if it waits longer than this value (in ms) to acquire an explicit or implicit table/row lock.	Essential for high-concurrency DBs. Stops long schema migrations or transactions from creating massive lock queues (blocking reads/writes).
   */
  static readonly LOCK_TIMEOUT = 'DB_POOL_LOCK_TIMEOUT';
}

export class EnvDB {
  static readonly USERNAME = 'DB_USERNAME';
  static readonly PASSWORD = 'DB_PASSWORD';
  static readonly SCHEMA = 'DB_SCHEMA';
  static readonly URL = 'DB_URL';
  static readonly POOL = EnvDBPool;
}

/**
 * Environment vriable keys
 */
export class Env {
  static readonly DEFAULT = 'default';

  static readonly APP = EnvApp;
  static readonly DB = EnvDB;

  static readonly D_1_SECOND = 1000;
  static readonly D_5_SECONDS = this.D_1_SECOND * 5;
  static readonly D_10_SECONDS = this.D_1_SECOND * 10;
  static readonly D_20_SECONDS = this.D_1_SECOND * 20;
  static readonly D_1_MINUTE = this.D_1_SECOND * 60;
  static readonly D_5_MINUTES = this.D_1_MINUTE * 5;
}
