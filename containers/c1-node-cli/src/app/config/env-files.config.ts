import { join } from 'path';

/**
 * Environment file paths configuration
 */
export const ENV_FILES_CONFIG = {
  /**
   * Gets the path to the default environment file
   * @param baseDir Base directory
   * @returns Path to the default environment file
   */
  getDefaultPath(baseDir: string = process.cwd()): string {
    return join(baseDir, '.env');
  },

  /**
   * Gets the path to the development environment file
   * @param baseDir Base directory
   * @returns Path to the development environment file
   */
  getDevelopmentPath(baseDir: string = process.cwd()): string {
    return join(baseDir, '.env.development');
  },

  /**
   * Gets the path to the production environment file
   * @param baseDir Base directory
   * @returns Path to the production environment file
   */
  getProductionPath(baseDir: string = process.cwd()): string {
    return join(baseDir, '.env.production');
  },

  /**
   * Gets the path to the test environment file
   * @param baseDir Base directory
   * @returns Path to the test environment file
   */
  getTestPath(baseDir: string = process.cwd()): string {
    return join(baseDir, '.env.test');
  },

  /**
   * Gets all environment file paths
   * @param baseDir Base directory
   * @returns Array of environment file paths
   */
  getAllPaths(baseDir: string = process.cwd()): string[] {
    return [
      this.getDefaultPath(baseDir),
      this.getDevelopmentPath(baseDir),
      this.getProductionPath(baseDir),
      this.getTestPath(baseDir),
    ];
  },

  /**
   * Gets environment file paths for a specific mode
   * @param mode Environment mode
   * @param baseDir Base directory
   * @returns Array of environment file paths
   */
  getPathsForMode(mode: string, baseDir: string = process.cwd()): string[] {
    const paths = [this.getDefaultPath(baseDir)];

    switch (mode) {
      case 'development':
        paths.push(this.getDevelopmentPath(baseDir));
        break;
      case 'production':
        paths.push(this.getProductionPath(baseDir));
        break;
      case 'test':
        paths.push(this.getTestPath(baseDir));
        break;
    }

    return paths;
  },
}; 