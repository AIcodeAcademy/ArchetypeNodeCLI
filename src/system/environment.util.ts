import { CliEnvironment } from "./environment.type.ts";

/**
 * Get an environment variable with type safety and optional default value.
 */
export function getEnvVar<K extends keyof CliEnvironment>(
	key: K,
	defaultValue?: CliEnvironment[K],
): CliEnvironment[K] {
	const value = process.env[key];
	if (value === undefined || value === "") {
		if (defaultValue !== undefined) return defaultValue;
		throw new Error(`Missing required environment variable: ${key}`);
	}
	return value as CliEnvironment[K];
}

/**
 * Load and validate all environment variables as a typed object.
 */
export function loadCliEnvironment(): CliEnvironment {
	const rawEnvironment = process.env;
	const typedEnvironment: Partial<CliEnvironment> = {};

	for (const key of Object.keys(rawEnvironment)) {
		const rawValue = rawEnvironment[key];
		typedEnvironment[key] = rawValue;
	}
	return typedEnvironment as CliEnvironment;
}
