import { EnvFileRepository } from '../../system/repositories/env-file.repository.js';
import { SystemEnvRepository } from '../../system/repositories/system-env.repository.js';
import { EnvironmentVariable, EnvironmentVariables } from '../../system/types/environment-variable.type.js';
import { EnvironmentConfig, EnvironmentMode } from '../../system/types/environment.type.js';
import { EnvParser } from '../../system/utils/env-parser.util.js';
import { EnvTransformer } from '../../system/utils/env-transformer.util.js';
import { EnvVariableValidator } from '../validators/env-variable.validator.js';
import { EnvironmentValidator } from '../validators/environment.validator.js';

/**
 * Service for managing environment variables
 */
export class EnvironmentService {
  private readonly envFileRepository: EnvFileRepository;
  private readonly systemEnvRepository: SystemEnvRepository;
  private readonly envParser: EnvParser;
  private readonly envTransformer: EnvTransformer;
  private readonly environmentValidator: EnvironmentValidator;
  private readonly envVariableValidator: EnvVariableValidator;

  constructor() {
    this.envFileRepository = new EnvFileRepository();
    this.systemEnvRepository = new SystemEnvRepository();
    this.envParser = new EnvParser();
    this.envTransformer = new EnvTransformer();
    this.environmentValidator = new EnvironmentValidator();
    this.envVariableValidator = new EnvVariableValidator();
  }

  /**
   * Loads environment variables from files and system
   * @param mode Environment mode
   * @param filePaths Paths to environment files
   * @returns Loaded environment variables
   */
  async loadEnvironment(
    mode: EnvironmentMode,
    filePaths: string[]
  ): Promise<EnvironmentVariables> {
    // Load environment variables from files
    const fileEnvVars = await Promise.all(
      filePaths.map((path) => this.envFileRepository.readEnvFile(path))
    );

    // Load system environment variables
    const systemEnvVars = this.systemEnvRepository.getAll();

    // Merge all environment variables
    const mergedEnvVars = this.envParser.merge(...fileEnvVars, systemEnvVars);

    // Validate environment variables
    this.envParser.validate(mergedEnvVars);
    this.envVariableValidator.validateVariables(mergedEnvVars);

    return mergedEnvVars;
  }

  /**
   * Gets environment configuration for a specific mode
   * @param mode Environment mode
   * @returns Environment configuration
   */
  getEnvironmentConfig(mode: EnvironmentMode): EnvironmentConfig {
    const config: EnvironmentConfig = {
      mode,
      isDevelopment: mode === 'development',
      isProduction: mode === 'production',
      isTest: mode === 'test',
    };

    if (!this.environmentValidator.isValidConfig(config)) {
      throw new Error(`Invalid environment configuration for mode: ${mode}`);
    }

    return config;
  }

  /**
   * Applies environment variables to process.env
   * @param envVars Environment variables to apply
   */
  applyToProcessEnv(envVars: EnvironmentVariables): void {
    const processEnv = this.envTransformer.toProcessEnv(envVars);
    Object.assign(process.env, processEnv);
  }

  /**
   * Gets a specific environment variable
   * @param name Name of the environment variable
   * @returns Environment variable or undefined if not found
   */
  getVariable(name: string): EnvironmentVariable | undefined {
    return this.systemEnvRepository.get(name);
  }

  /**
   * Checks if all required environment variables are present
   * @param envVars Environment variables to check
   * @returns True if all required variables are present
   */
  areRequiredVariablesPresent(envVars: EnvironmentVariables): boolean {
    const missingVars = this.environmentValidator.validateRequiredVariables(envVars);
    return missingVars.length === 0;
  }
} 