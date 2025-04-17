/**
 * @module environment.type
 * @description Defines the structure for environment variables.
 */
import { FilePath } from "../system/system.type.ts";

/**
 * Represents the expected environment variables for the application.
 */
export type Environment = {
	readonly NODE_ENV?: "development" | "production" | "test";
	readonly LOG_LEVEL?: "debug" | "info" | "warn" | "error";
	readonly CONFIG_FILE_PATH?: FilePath;
	// Add other relevant environment variables here
};
