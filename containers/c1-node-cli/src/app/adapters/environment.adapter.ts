import { EnvironmentService } from '../../domain/services/environment.service.js';
import { EnvironmentVariables } from '../../system/types/environment-variable.type.js';
import { EnvironmentConfig, EnvironmentMode } from '../../system/types/environment.type.js';
import { ENV_FILES_CONFIG } from '../config/env-files.config.js';
import { ENV_VAR_DEFAULTS, REQUIRED_ENV_VARS } from '../config/environment.config.js';

/**
 * Adapter for environment setup and initialization
 */
export class EnvironmentAdapter {
  private readonly environmentService: EnvironmentService;

  constructor() {
    this.environmentService = new EnvironmentService();
  }

  /**
   * Initializes the environment
   * @param mode Environment mode
   * @returns Environment configuration and variables
   */
  async initialize(mode: EnvironmentMode = 'development'): Promise<{
    config: EnvironmentConfig;
    variables: EnvironmentVariables;
  }> {
    // Get environment configuration
    const config = this.environmentService.getEnvironmentConfig(mode);

    // Get environment file paths
    const filePaths = ENV_FILES_CONFIG.getPathsForMode(mode);

    // Load environment variables
    const variables = await this.environmentService.loadEnvironment(mode, filePaths);

    // Apply default values for required variables
    this.applyDefaults(variables);

    // Validate required variables
    this.validateRequiredVariables(variables);

    // Apply environment variables to process.env
    this.environmentService.applyToProcessEnv(variables);

    return { config, variables };
  }

  /**
   * Applies default values for required variables
   * @param variables Environment variables
   */
  private applyDefaults(variables: EnvironmentVariables): void {
    for (const name of REQUIRED_ENV_VARS) {
      if (!variables[name]) {
        variables[name] = {
          name,
          value: ENV_VAR_DEFAULTS[name] || '',
          required: true,
        };
      }
    }
  }

  /**
   * Validates required environment variables
   * @param variables Environment variables
   * @throws Error if required variables are missing
   */
  private validateRequiredVariables(variables: EnvironmentVariables): void {
    const missingVars = REQUIRED_ENV_VARS.filter(
      (name) => !variables[name] || !variables[name].value
    );

    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}`
      );
    }
  }
} 