/**
 * @module environment.adapter
 * @description Adapter for accessing environment variables.
 */

/**
 * Retrieves the value of an environment variable.
 *
 * @param {string} name - The name of the environment variable.
 * @returns {string | undefined} The value of the environment variable, or undefined if it's not set.
 */
export const getEnvironmentVariable = (name: string): string | undefined => {
	return process.env[name];
};
