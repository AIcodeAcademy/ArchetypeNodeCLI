import { CliEnvironment, RequiredEnvironment } from "./environment.type.ts";

/**
 * Validate and return a fully typed CliEnvironment object.
 * Throws if required variables are missing or invalid.
 */
export function validateEnvironment(
	env: Partial<CliEnvironment>,
): CliEnvironment {
	const required: (keyof RequiredEnvironment)[] = [
		"APP_NAME",
		"APP_ENV",
		"LOG_LEVEL",
	];
	for (const key of required) {
		if (!env[key]) {
			throw new Error(`Missing required environment variable: ${key}`);
		}
	}
	// Type assertion is safe after validation
	return env as CliEnvironment;
}
