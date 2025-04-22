import { z } from 'zod';
import { ENVIRONMENT_VARIABLES_SCHEMA, EnvironmentVariable, EnvironmentVariables } from '../types/environment-variable.type.js';

/**
 * Utility for parsing and validating environment variables
 */
export class EnvParser {
  /**
   * Validates environment variables against the schema
   * @param envVars Environment variables to validate
   * @returns Validated environment variables
   * @throws Error if validation fails
   */
  validate(envVars: EnvironmentVariables): EnvironmentVariables {
    try {
      return ENVIRONMENT_VARIABLES_SCHEMA.parse(envVars);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Environment validation failed: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Merges multiple sets of environment variables
   * @param envVarsList List of environment variable sets to merge
   * @returns Merged environment variables
   */
  merge(...envVarsList: EnvironmentVariables[]): EnvironmentVariables {
    return envVarsList.reduce((merged, envVars) => {
      return { ...merged, ...envVars };
    }, {});
  }

  /**
   * Filters environment variables based on a predicate
   * @param envVars Environment variables to filter
   * @param predicate Filter predicate
   * @returns Filtered environment variables
   */
  filter(
    envVars: EnvironmentVariables,
    predicate: (envVar: EnvironmentVariable) => boolean
  ): EnvironmentVariables {
    return Object.fromEntries(
      Object.entries(envVars).filter(([_, envVar]) => predicate(envVar))
    );
  }
} 