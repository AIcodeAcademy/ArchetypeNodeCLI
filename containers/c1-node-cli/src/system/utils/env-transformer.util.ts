import { EnvironmentVariables } from '../types/environment-variable.type.js';

/**
 * Utility for transforming environment variables
 */
export class EnvTransformer {
  /**
   * Transforms environment variables to a plain object
   * @param envVars Environment variables to transform
   * @returns Plain object with environment variables
   */
  toPlainObject(envVars: EnvironmentVariables): Record<string, string> {
    return Object.fromEntries(
      Object.entries(envVars).map(([name, envVar]) => [name, envVar.value])
    );
  }

  /**
   * Transforms a plain object to environment variables
   * @param obj Plain object to transform
   * @returns Environment variables
   */
  fromPlainObject(obj: Record<string, string>): EnvironmentVariables {
    return Object.fromEntries(
      Object.entries(obj).map(([name, value]) => [
        name,
        {
          name,
          value,
          required: true,
        },
      ])
    );
  }

  /**
   * Transforms environment variables to a string format
   * @param envVars Environment variables to transform
   * @returns String representation of environment variables
   */
  toString(envVars: EnvironmentVariables): string {
    return Object.entries(envVars)
      .map(([name, envVar]) => `${name}=${envVar.value}`)
      .join('\n');
  }

  /**
   * Transforms environment variables to a format suitable for process.env
   * @param envVars Environment variables to transform
   * @returns Object suitable for process.env
   */
  toProcessEnv(envVars: EnvironmentVariables): NodeJS.ProcessEnv {
    return this.toPlainObject(envVars);
  }
} 