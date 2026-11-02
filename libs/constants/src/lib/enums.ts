export enum AppProfile {
  // Environments
  DEVELOPMENT = 'DEVELOPMENT',
  TEST = 'TEST',
  STAGING = 'STAGING',
  PRODUCTION = 'PRODUCTION',

  // Roles (what this instance does)
  PUBLIC = 'PUBLIC', // internet-facing API
  ADMIN = 'ADMIN', // back-office API
  SLOW = 'SLOW', // long-running requests, larger timeouts
  WORKER = 'WORKER', // background jobs / queue consumers
  SCHEDULER = 'SCHEDULER', // cron-style jobs only
  MIGRATION = 'MIGRATION', // run migrations, then exit

  // Operating modes
  READONLY = 'READONLY', // reads allowed, writes rejected
  MAINTENANCE = 'MAINTENANCE', // return 503 except health checks
}

export enum AuthProfile {
  PUBLIC = 'PUBLIC', // no authentication
  AUTHENTICATED = 'AUTHENTICATED', // any valid logged-in user
  ROLE_BASED = 'ROLE_BASED', // permissions checked per route/role
  ADMIN_ONLY = 'ADMIN_ONLY', // only admin users
  ROOT_ONLY = 'ROOT_ONLY', // only the root user (ROOT_USERNAME/PASSWORD)
  API_KEY = 'API_KEY', // static key for integrations
  INTERNAL = 'INTERNAL', // service-to-service, trusted network
  MOCK = 'MOCK', // fake user, dev/test only
}
