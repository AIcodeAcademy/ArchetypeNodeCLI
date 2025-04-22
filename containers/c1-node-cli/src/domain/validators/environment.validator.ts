import { EnvironmentVariables } from '../../system/types/environment-variable.type.js';
import { EnvironmentConfig, EnvironmentMode } from '../../system/types/environment.type.js';

/**
 * Validator for environment configuration
 */
export class EnvironmentValidator {
  /**
   * Validates environment mode
   * @param mode Environment mode to validate
   * @returns True if mode is valid
   */
  isValidMode(mode: string): mode is EnvironmentMode {
    return ['development', 'production', 'test'].includes(mode);
  }

  /**
   * Validates environment configuration
   * @param config Environment configuration to validate
   * @returns True if configuration is valid
   */
  isValidConfig(config: EnvironmentConfig): boolean {
    return (
      this.isValidMode(config.mode) &&
      config.isDevelopment === (config.mode === 'development') &&
      config.isProduction === (config.mode === 'production') &&
      config.isTest === (config.mode === 'test')
    );
  }

  /**
   * Validates required environment variables
   * @param envVars Environment variables to validate
   * @returns Array of missing required variables
   */
  validateRequiredVariables(envVars: EnvironmentVariables): string[] {
    return Object.entries(envVars)
      .filter(([_, envVar]) => envVar.required && !envVar.value)
      .map(([name]) => name);
  }

  /**
   * Validates environment variables for a specific mode
   * @param envVars Environment variables to validate
   * @param mode Environment mode
   * @returns True if variables are valid for the mode
   */
  isValidForMode(envVars: EnvironmentVariables, mode: EnvironmentMode): boolean {
    const requiredVars = this.validateRequiredVariables(envVars);
    return requiredVars.length === 0;
  }
} 