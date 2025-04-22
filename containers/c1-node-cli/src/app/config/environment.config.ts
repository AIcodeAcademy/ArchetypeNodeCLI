import { EnvironmentConfig } from '../../system/types/environment.type.js';

/**
 * Default environment configuration
 */
export const DEFAULT_ENVIRONMENT_CONFIG: EnvironmentConfig = {
  mode: 'development',
  isDevelopment: true,
  isProduction: false,
  isTest: false,
};

/**
 * Environment file patterns
 */
export const ENV_FILE_PATTERNS = {
  DEFAULT: '.env',
  DEVELOPMENT: '.env.development',
  PRODUCTION: '.env.production',
  TEST: '.env.test',
};

/**
 * Environment file paths
 */
export const ENV_FILE_PATHS = {
  DEFAULT: process.cwd() + '/' + ENV_FILE_PATTERNS.DEFAULT,
  DEVELOPMENT: process.cwd() + '/' + ENV_FILE_PATTERNS.DEVELOPMENT,
  PRODUCTION: process.cwd() + '/' + ENV_FILE_PATTERNS.PRODUCTION,
  TEST: process.cwd() + '/' + ENV_FILE_PATTERNS.TEST,
};

/**
 * Required environment variables
 */
export const REQUIRED_ENV_VARS = [
  'NODE_ENV',
  'PORT',
  'LOG_LEVEL',
];

/**
 * Environment variable defaults
 */
export const ENV_VAR_DEFAULTS: Record<string, string> = {
  NODE_ENV: 'development',
  PORT: '3000',
  LOG_LEVEL: 'info',
}; 