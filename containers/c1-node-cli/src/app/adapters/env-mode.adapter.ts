import { EnvironmentValidator } from '../../domain/validators/environment.validator.js';
import { EnvironmentConfig, EnvironmentMode } from '../../system/types/environment.type.js';
import { DEFAULT_ENVIRONMENT_CONFIG } from '../config/environment.config.js';

/**
 * Adapter for environment mode detection and validation
 */
export class EnvModeAdapter {
  private readonly environmentValidator: EnvironmentValidator;

  constructor() {
    this.environmentValidator = new EnvironmentValidator();
  }

  /**
   * Detects the current environment mode
   * @returns Detected environment mode
   */
  detectMode(): EnvironmentMode {
    const mode = process.env.NODE_ENV || 'development';
    return this.validateMode(mode);
  }

  /**
   * Validates an environment mode
   * @param mode Mode to validate
   * @returns Validated environment mode
   * @throws Error if mode is invalid
   */
  validateMode(mode: string): EnvironmentMode {
    if (!this.environmentValidator.isValidMode(mode)) {
      throw new Error(`Invalid environment mode: ${mode}`);
    }
    return mode as EnvironmentMode;
  }

  /**
   * Gets environment configuration for a specific mode
   * @param mode Environment mode
   * @returns Environment configuration
   */
  getConfig(mode: EnvironmentMode): EnvironmentConfig {
    return {
      mode,
      isDevelopment: mode === 'development',
      isProduction: mode === 'production',
      isTest: mode === 'test',
    };
  }

  /**
   * Gets the default environment configuration
   * @returns Default environment configuration
   */
  getDefaultConfig(): EnvironmentConfig {
    return DEFAULT_ENVIRONMENT_CONFIG;
  }
} 