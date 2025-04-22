import { EnvFileRepository } from '../../system/repositories/env-file.repository.js';
import { SystemEnvRepository } from '../../system/repositories/system-env.repository.js';
import { EnvironmentVariable, EnvironmentVariables } from '../../system/types/environment-variable.type.js';
import { EnvironmentMode } from '../../system/types/environment.type.js';
import { EnvParser } from '../../system/utils/env-parser.util.js';

/**
 * Service for loading and merging environment variables
 */
export class EnvLoaderService {
  private readonly envFileRepository: EnvFileRepository;
  private readonly systemEnvRepository: SystemEnvRepository;
  private readonly envParser: EnvParser;

  constructor() {
    this.envFileRepository = new EnvFileRepository();
    this.systemEnvRepository = new SystemEnvRepository();
    this.envParser = new EnvParser();
  }

  /**
   * Loads environment variables from a specific file
   * @param filePath Path to the environment file
   * @returns Loaded environment variables
   */
  async loadFromFile(filePath: string): Promise<EnvironmentVariables> {
    const envVars = await this.envFileRepository.readEnvFile(filePath);
    return this.envParser.validate(envVars);
  }

  /**
   * Loads environment variables from system
   * @returns Loaded environment variables
   */
  loadFromSystem(): EnvironmentVariables {
    return this.systemEnvRepository.getAll();
  }

  /**
   * Loads environment variables from multiple sources
   * @param mode Environment mode
   * @param filePaths Paths to environment files
   * @returns Loaded and merged environment variables
   */
  async loadFromMultipleSources(
    mode: EnvironmentMode,
    filePaths: string[]
  ): Promise<EnvironmentVariables> {
    // Load from files
    const fileEnvVars = await Promise.all(
      filePaths.map((path) => this.loadFromFile(path))
    );

    // Load from system
    const systemEnvVars = this.loadFromSystem();

    // Merge all environment variables
    return this.envParser.merge(...fileEnvVars, systemEnvVars);
  }

  /**
   * Merges multiple sets of environment variables
   * @param envVarsList List of environment variable sets to merge
   * @returns Merged environment variables
   */
  merge(...envVarsList: EnvironmentVariables[]): EnvironmentVariables {
    return this.envParser.merge(...envVarsList);
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
    return this.envParser.filter(envVars, predicate);
  }
} 