export class Duration {
  static readonly SECOND = 1000;
  static readonly SECONDS_5 = this.SECOND * 5;
  static readonly SECONDS_10 = this.SECOND * 10;
  static readonly SECONDS_20 = this.SECOND * 20;
  static readonly MINUTE = this.SECOND * 60;
  static readonly MINUTES_5 = this.MINUTE * 5;
}

export abstract class BaseEnv {
  __profile?: string;

  protected get profile() {
    return this.__profile ? `${this.__profile}_` : '';
  }

  protected prep(key: string) {
    return `${this.profile}${key}`;
  }

  constructor(profile?: string) {
    this.__profile = profile;
  }
}

export class EnvApp extends BaseEnv {
  /**
   * Unique application name
   */
  static readonly NAME = 'NAME';

  /**
   * Rest api port
   */
  static readonly PORT = 'PORT';

  /**
   * Rest api global path prefix such as 'api'
   */
  static readonly API_PREFIX = 'API_PREFIX';

  /**
   * App description
   */
  static readonly DESCRIPTION = 'DESCRIPTION';

  /**
   * Runtime profile such as DEVELOPMENT, PRODUCTION, READONLY
   */
  static readonly PROFILE = 'PROFILE';

  get NAME() {
    return this.prep(EnvApp.NAME);
  }
  get PORT() {
    return this.prep(EnvApp.PORT);
  }
  get API_PREFIX() {
    return this.prep(EnvApp.API_PREFIX);
  }
  get DESCRIPTION() {
    return this.prep(EnvApp.DESCRIPTION);
  }
}

export class EnvAuth extends BaseEnv {
  /**
   * JWT SECRET to genreate user authentication tokens
   */
  static readonly JWT_SECRET = 'JWT_SECRET';

  /**
   * Who created the jwt
   */
  static readonly JWT_ISSUER = 'JWT_ISSUER';

  /**
   * What is the jwt for
   */
  static readonly JWT_SUBJECT = 'JWT_SUBJECT';

  /**
   * Who is the jwt for
   */
  static readonly JWT_AUDIENCE = 'JWT_AUDIENCE';

  /**
   * Encription secret to encript data
   */
  static readonly ENCRIPTION_SECRET = 'ENCRIPTION_SECRET';

  /**
   * Root user username
   */
  static readonly ROOT_USERANME = 'ROOT_USERANME';

  /**
   * Root user password
   */
  static readonly ROOT_PASSWORD = 'ROOT_PASSWORD';

  /**
   * Authentication profile such as public
   */
  static readonly AUTH_PROFILE = 'AUTH_PROFILE';

  static readonly ALLOWED_ORIGINS = 'ALLOWED_ORIGINS';

  get JWT_SECRET() {
    return this.prep(EnvAuth.JWT_SECRET);
  }

  get ENCRIPTION_SECRET() {
    return this.prep(EnvAuth.ENCRIPTION_SECRET);
  }

  get ROOT_USERANME() {
    return this.prep(EnvAuth.ROOT_USERANME);
  }

  get ROOT_PASSWORD() {
    return this.prep(EnvAuth.ROOT_PASSWORD);
  }

  get AUTH_PROFILE() {
    return this.prep(EnvAuth.AUTH_PROFILE);
  }

  get ALLOWED_ORIGINS() {
    return this.prep(EnvAuth.ALLOWED_ORIGINS);
  }
}

export class EnvPg extends BaseEnv {
  /**
   * The maximum number of clients/connections allowed in this pool.	Default is usually 10. Don't set this higher than your PostgreSQL server's max_connections limit.
   */
  static readonly MAX = 'MAX';

  /**
   * How long (in milliseconds) a request will wait to acquire an available client from the pool before throwing a timeout error.	Default is 0 (wait indefinitely). In production, set this (e.g., 5000 ms) to prevent requests from hanging indefinitely during high traffic spikes.
   */
  static readonly CONNECTION_TIMEOUT_MILLIS = 'CONNECTION_TIMEOUT_MILLIS';

  /**
   * How long (in milliseconds) a connection can sit unused in the pool before being closed and discarded.	Default is usually 10000 (10 seconds). Keeps connection counts low during quiet periods.
   */
  static readonly IDLE_TIMEOUT_MILLIS = 'IDLE_TIMEOUT_MILLIS';

  /**
   * The maximum number of times a single connection can be checked out and reused before the pool closes and replaces it.	Default is 0 (unlimited). Useful to set (e.g., 7500) to mitigate subtle memory leaks or clean up stale session-level state in long-lived node processes.
   */
  static readonly MAX_USES = 'MAX_USES';

  /**
   * Aborts any individual SQL statement that takes longer than the specified number of milliseconds.	Your primary circuit breaker. Prevents runaway, un-indexed, or slow queries from bogging down your database. 5000 miliseconds is ideal
   */
  static readonly STATEMENT_TIMEOUT = 'STATEMENT_TIMEOUT';

  /**
   * Node-side timeout for a query to complete before the driver rejects the Promise.	Acts as a client-side backup if the network connection drops while waiting for Postgres to return results.
   */
  static readonly QUERY_TIMEOUT = 'QUERY_TIMEOUT';

  /**
   * Aborts any statement if it waits longer than this value (in ms) to acquire an explicit or implicit table/row lock.	Essential for high-concurrency DBs. Stops long schema migrations or transactions from creating massive lock queues (blocking reads/writes).
   */
  static readonly LOCK_TIMEOUT = 'LOCK_TIMEOUT';

  static readonly DEFAULT_MAX = 10;
  static readonly DEFAULT_CONNECTION_TIMEOUT_MILLIS = Duration.SECONDS_5;
  static readonly DEFAULT_IDLE_TIMEOUT_MILLIS = Duration.SECONDS_10;
  static readonly DEFAULT_MAX_USES = 7500;
  static readonly DEFAULT_STATEMENT_TIMEOUT = Duration.SECONDS_5;
  static readonly DEFAULT_QUERY_TIMEOUT = Duration.SECONDS_10;
  static readonly DEFAULT_LOCK_TIMEOUT = Duration.SECONDS_10;

  get MAX() {
    return this.prep(EnvPg.MAX);
  }

  get CONNECTION_TIMEOUT_MILLIS() {
    return this.prep(EnvPg.CONNECTION_TIMEOUT_MILLIS);
  }

  get IDLE_TIMEOUT_MILLIS() {
    return this.prep(EnvPg.IDLE_TIMEOUT_MILLIS);
  }

  get MAX_USES() {
    return this.prep(EnvPg.MAX_USES);
  }

  get STATEMENT_TIMEOUT() {
    return this.prep(EnvPg.STATEMENT_TIMEOUT);
  }

  get QUERY_TIMEOUT() {
    return this.prep(EnvPg.QUERY_TIMEOUT);
  }

  get LOCK_TIMEOUT() {
    return this.prep(EnvPg.LOCK_TIMEOUT);
  }
}

export class EnvDB extends BaseEnv {
  static readonly DATABASE_USERNAME = 'DATABASE_USERNAME';
  static readonly DATABASE_PASSWORD = 'DATABASE_PASSWORD';
  static readonly DATABASE_URL = 'DATABASE_URL';
  static readonly DATABASE_SCHEMA = 'DATABASE_SCHEMA';
  static readonly PG = EnvPg;

  get DATABASE_USERNAME() {
    return this.prep(EnvDB.DATABASE_USERNAME);
  }

  get DATABASE_PASSWORD() {
    return this.prep(EnvDB.DATABASE_PASSWORD);
  }

  get DATABASE_SCHEMA() {
    return this.prep(EnvDB.DATABASE_SCHEMA);
  }

  get DATABASE_URL() {
    return this.prep(EnvDB.DATABASE_URL);
  }

  get PG() {
    return new EnvPg(this.profile);
  }
}

/**
 * Environment vriable keys
 */
export class Env extends BaseEnv {
  static readonly DEFAULT = 'default';
  static readonly APP = EnvApp;
  static readonly DB = EnvDB;
  static readonly AUTH = EnvAuth;

  get APP() {
    return new EnvApp(this.profile);
  }

  get DB() {
    return new EnvDB(this.profile);
  }

  get AUTH() {
    return new EnvAuth(this.profile);
  }
}
