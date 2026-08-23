export class EnvApp {
  static readonly NAME = 'APP_NAME';
  static readonly PORT = 'APP_PORT';
  static readonly JWT = 'APP_JWT';
  static readonly USERANME = 'APP_USERANME';
  static readonly PASSWORD = 'APP_PASSWORD';
  static readonly PROFILE = 'APP_PROFILE';
}

export class EnvDB {
  static readonly USERNAME = 'DB_USERNAME';
  static readonly PASSWORD = 'DB_PASSWORD';
  static readonly URL = 'DB_URL';
}

/**
 * Environment vriable keys
 */
export class Env {
  static readonly APP = EnvApp;
  static readonly DB = EnvDB;
}
