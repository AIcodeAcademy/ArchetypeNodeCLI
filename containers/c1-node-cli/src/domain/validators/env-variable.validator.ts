import { EnvironmentVariable, EnvironmentVariables } from '../../system/types/environment-variable.type.js';

/**
 * Validator for environment variables
 */
export class EnvVariableValidator {
  /**
   * Validates an environment variable name
   * @param name Name to validate
   * @returns True if name is valid
   */
  isValidName(name: string): boolean {
    return /^[A-Z_][A-Z0-9_]*$/.test(name);
  }

  /**
   * Validates an environment variable value
   * @param value Value to validate
   * @returns True if value is valid
   */
  isValidValue(value: string): boolean {
    return value.length > 0;
  }

  /**
   * Validates an environment variable
   * @param envVar Environment variable to validate
   * @returns True if variable is valid
   */
  isValidVariable(envVar: EnvironmentVariable): boolean {
    return (
      this.isValidName(envVar.name) &&
      this.isValidValue(envVar.value) &&
      typeof envVar.required === 'boolean'
    );
  }

  /**
   * Validates a collection of environment variables
   * @param envVars Environment variables to validate
   * @returns Array of invalid variable names
   */
  validateVariables(envVars: EnvironmentVariables): string[] {
    return Object.entries(envVars)
      .filter(([_, envVar]) => !this.isValidVariable(envVar))
      .map(([name]) => name);
  }

  /**
   * Checks if all environment variables are valid
   * @param envVars Environment variables to check
   * @returns True if all variables are valid
   */
  areAllValid(envVars: EnvironmentVariables): boolean {
    return this.validateVariables(envVars).length === 0;
  }
} 