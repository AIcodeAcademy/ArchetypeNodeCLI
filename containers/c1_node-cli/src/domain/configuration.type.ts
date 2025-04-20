/**
 * @module configuration.type
 * @description Defines the structure for application configuration.
 */
import { DirectoryPath, FilePath } from "../system/system.type.ts";
import { Environment } from "./environment.type.ts";

/**
 * Represents the logging configuration.
 */
export type LoggingConfiguration = {
	readonly level: "debug" | "info" | "warn" | "error";
	readonly destinations: ReadonlyArray<"console" | "file">;
	readonly filePath?: FilePath;
	readonly colors: boolean;
	readonly timestamp: boolean;
};

/**
 * Represents the command configuration.
 */
export type CommandConfiguration = {
	readonly defaultCommand: string;
	readonly allowUnknownOptions: boolean;
};

/**
 * Represents the path configuration.
 */
export type PathConfiguration = {
	readonly data: DirectoryPath;
	readonly temp: DirectoryPath;
	readonly logs: DirectoryPath;
};

/**
 * Represents the feature flags configuration.
 */
export type FeatureConfiguration = {
	readonly autoUpdateCheck: boolean;
	readonly telemetry: boolean;
};

/**
 * Represents the main application configuration structure.
 */
export type Configuration = {
	readonly app: {
		readonly name: string;
		readonly version: string;
		readonly description: string;
	};
	readonly logging: LoggingConfiguration;
	readonly commands: CommandConfiguration;
	readonly paths: PathConfiguration;
	readonly features: FeatureConfiguration;
	readonly environment?: Environment; // Optional environment context
	readonly filePath?: FilePath; // Optional path from where it was loaded
};
