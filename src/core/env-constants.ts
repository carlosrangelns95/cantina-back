import 'dotenv/config';

/**
 * Environment variable constants
 *
 * This file centralizes all environment variable access using process.env
 * Import these constants instead of directly using process.env throughout the application
 */

export class EnvConstants {
  /**
   * Helper method to get environment variables with type conversion and default values
   *
   * @param key The environment variable key
   * @param defaultValue The default value if the environment variable is not set
   * @returns The environment variable value or the default value
   */
  private static getEnv<T>(key: string, defaultValue: T): T {
    const value = process.env[key];

    if (value === undefined) {
      return defaultValue;
    }

    // Type conversion based on the default value type
    if (typeof defaultValue === 'number') {
      return Number(value) as unknown as T;
    } else if (typeof defaultValue === 'boolean') {
      return (value.toLowerCase() === 'true') as unknown as T;
    }

    return value as unknown as T;
  }

  /**
   * Server configuration
   */
  static get PORT(): number {
    return EnvConstants.getEnv<number>('PORT', 3000);
  }

  static get NODE_ENV(): string {
    return EnvConstants.getEnv<string>('NODE_ENV', 'development');
  }

  static get isDevelopment(): boolean {
    return EnvConstants.NODE_ENV === 'development';
  }

  static get isProduction(): boolean {
    return EnvConstants.NODE_ENV === 'production';
  }

  /**
   * Application configuration
   */
  static get APP_NAME(): string {
    return EnvConstants.getEnv<string>('APP_NAME', 'app');
  }

  /**
   * Database configuration
   */
  static get DB_TYPE(): any {
    return EnvConstants.getEnv<string>('DB_TYPE', 'postgres');
  }

  static get DB_HOST(): string {
    return EnvConstants.getEnv<string>('DB_HOST', 'localhost');
  }

  static get DB_PORT(): number {
    return EnvConstants.getEnv<number>('DB_PORT', 5432);
  }

  static get DB_USERNAME(): string {
    return EnvConstants.getEnv<string>('DB_USERNAME', 'postgres');
  }

  static get DB_PASSWORD(): string {
    return EnvConstants.getEnv<string>('DB_PASSWORD', 'postgres');
  }

  static get DB_DATABASE(): string {
    return EnvConstants.getEnv<string>('DB_DATABASE', 'mydatabase');
  }

  static get TYPEORM_SYNCHRONIZE(): boolean {
    return EnvConstants.getEnv<boolean>('TYPEORM_SYNCHRONIZE', EnvConstants.isDevelopment);
  }

  static get TYPEORM_LOGGING(): boolean {
    return EnvConstants.getEnv<boolean>('TYPEORM_LOGGING', EnvConstants.isDevelopment);
  }

  /**
   * IAM configuration
   */
  static get IAM_GRPC_URL(): string {
    return EnvConstants.getEnv<string>('IAM_GRPC_URL', 'localhost:50051');
  }

  static get IAM_HTTP_URL(): string {
    return EnvConstants.getEnv<string>('IAM_HTTP_URL', 'http://localhost:8555');
  }

  static get IAM_WEBHOOK_URL(): string {
    return EnvConstants.getEnv<string>('IAM_WEBHOOK_URL', '');
  }

  /**
   * Logging configuration
   */
  static get LOG_LEVEL(): string {
    return EnvConstants.getEnv<string>('LOG_LEVEL', EnvConstants.isDevelopment ? 'debug' : 'info');
  }

  static get LOG_PRETTY(): boolean {
    return EnvConstants.getEnv<boolean>('LOG_PRETTY', EnvConstants.isDevelopment);
  }

  /**
   * Mailer configuration
   */
  static get MAIL_HOST(): string {
    return EnvConstants.getEnv<string>('MAIL_HOST', '');
  }

  static get MAIL_PORT(): number {
    return EnvConstants.getEnv<number>('MAIL_PORT', 587);
  }

  static get MAIL_USER_NAME(): string {
    return EnvConstants.getEnv<string>('MAIL_USER_NAME', '');
  }

  static get MAIL_PASSWORD(): string {
    return EnvConstants.getEnv<string>('MAIL_PASSWORD', '');
  }

  static get MAIL_FROM(): string {
    return EnvConstants.getEnv<string>('MAIL_FROM', '');
  }

  /**
   * JWT configuration
   */
  static get JWT_EMAIL_CONFIRM_SECRET(): string {
    return EnvConstants.getEnv<string>('JWT_EMAIL_CONFIRM_SECRET', 'default-secret-key');
  }

  static get JWT_EMAIL_CONFIRM_EXPIRATION(): string {
    return EnvConstants.getEnv<string>('JWT_EMAIL_CONFIRM_EXPIRATION', '1h');
  }

  /**
   * schedule configuration
   */
  static get DEFAULT_SCHEDULE_LOOKBACK_WEEKS(): number {
    return EnvConstants.getEnv<number>('DEFAULT_SCHEDULE_LOOKBACK_WEEKS', 2);
  }

  static get DEFAULT_SCHEDULE_LOOKAHEAD_WEEKS(): number {
    return EnvConstants.getEnv<number>('DEFAULT_SCHEDULE_LOOKAHEAD_WEEKS', 8);
  }

  static get TIMEZONE(): string {
    return EnvConstants.getEnv<string>('TIMEZONE', 'America/Sao_Paulo');
  }

  static get MESSAGING_SERVICE_URL(): string {
    return EnvConstants.getEnv<string>('MESSAGING_SERVICE_URL', 'http://localhost:3001');
  }

  static get MESSAGING_SERVICE_API_KEY(): string {
    return EnvConstants.getEnv<string>('MESSAGING_SERVICE_API_KEY', '');
  }

  static get CONFIRM_EMAIL_FRONTEND_URL(): string {
    return EnvConstants.getEnv<string>('CONFIRM_EMAIL_FRONTEND_URL', '');
  }
}
