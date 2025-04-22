import { EnvironmentVariable, EnvironmentVariables } from '../types/environment-variable.type.js';

/**
 * Repository for accessing system environment variables
 */
export class SystemEnvRepository {
	/**
	 * Gets all system environment variables
	 * @returns Environment variables
	 */
	getAll(): EnvironmentVariables {
		const envVars: EnvironmentVariables = {};

		for (const [name, value] of Object.entries(process.env)) {
			if (value !== undefined && value !== null) {
				envVars[name] = {
					name,
					value,
					required: true,
				};
			}
		}

		return envVars;
	}

	/**
	 * Gets a specific system environment variable
	 * @param name Name of the environment variable
	 * @returns Environment variable or undefined if not found
	 */
	get(name: string): EnvironmentVariable | undefined {
		const value = process.env[name];
		if (value === undefined || value === null) {
			return undefined;
		}

		return {
			name,
			value,
			required: true,
		};
	}
}
