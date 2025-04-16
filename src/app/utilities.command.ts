/**
 * Command-line utilities for environment, configuration, and logging management
 */
import {
	ConfigService,
	EnvService,
	LogService,
} from "../domain/utilities.service.js";
import { LogLevel } from "../system/log.utils.js";

/**
 * Command structure for utility commands
 */
export type Command = {
	name: string;
	description: string;
	execute: (args: string[]) => Promise<void>;
};

/**
 * Creates environment-related CLI commands
 */
export const createEnvCommands = (envService: EnvService): Command[] => [
	{
		name: "env:list",
		description: "List all environment variables",
		execute: async (): Promise<void> => {
			const envVars = await envService.getAll();
			console.log("Environment variables:");
			Object.entries(envVars).forEach(([key, value]) => {
				console.log(`${key}=${value}`);
			});
		},
	},
	{
		name: "env:get",
		description: "Get the value of an environment variable",
		execute: async (args: string[]): Promise<void> => {
			if (args.length === 0) {
				console.error("Error: Missing variable name");
				console.log("Usage: env:get <variable-name>");
				return;
			}

			const varName = args[0];
			const exists = await envService.isSet(varName);

			if (!exists) {
				console.log(`Environment variable ${varName} is not set`);
				return;
			}

			const value = await envService.getString(varName);
			console.log(`${varName}=${value}`);
		},
	},
];

/**
 * Creates configuration-related CLI commands
 */
export const createConfigCommands = (
	configService: ConfigService,
): Command[] => [
	{
		name: "config:load",
		description: "Load configuration from a file",
		execute: async (args: string[]): Promise<void> => {
			const filePath = args[0];
			try {
				await configService.load(filePath);
				console.log(
					`Configuration loaded from ${filePath || "default location"}`,
				);
			} catch (error) {
				console.error(
					`Error loading configuration: ${(error as Error).message}`,
				);
			}
		},
	},
	{
		name: "config:get",
		description: "Get a configuration value",
		execute: async (args: string[]): Promise<void> => {
			if (args.length === 0) {
				console.error("Error: Missing key");
				console.log("Usage: config:get <key> [defaultValue]");
				return;
			}

			const key = args[0];
			const defaultValue = args[1];

			try {
				const value = await configService.get(key, defaultValue);
				console.log(`${key}=${JSON.stringify(value)}`);
			} catch (error) {
				console.error(
					`Error getting configuration value: ${(error as Error).message}`,
				);
			}
		},
	},
	{
		name: "config:set",
		description: "Set a configuration value",
		execute: async (args: string[]): Promise<void> => {
			if (args.length < 2) {
				console.error("Error: Missing key or value");
				console.log("Usage: config:set <key> <value>");
				return;
			}

			const key = args[0];
			const valueStr = args[1];

			// Attempt to parse the value as JSON, fallback to string if it fails
			let value: unknown;
			try {
				value = JSON.parse(valueStr);
			} catch {
				value = valueStr;
			}

			try {
				await configService.set(key, value);
				console.log(`Configuration value set: ${key}=${JSON.stringify(value)}`);
			} catch (error) {
				console.error(
					`Error setting configuration value: ${(error as Error).message}`,
				);
			}
		},
	},
	{
		name: "config:save",
		description: "Save configuration to a file",
		execute: async (args: string[]): Promise<void> => {
			const filePath = args[0];

			try {
				await configService.save(filePath);
				console.log(`Configuration saved to ${filePath || "default location"}`);
			} catch (error) {
				console.error(
					`Error saving configuration: ${(error as Error).message}`,
				);
			}
		},
	},
	{
		name: "config:show",
		description: "Show the full configuration",
		execute: async (): Promise<void> => {
			try {
				const config = await configService.getFullConfig();
				console.log("Current configuration:");
				console.log(JSON.stringify(config, null, 2));
			} catch (error) {
				console.error(
					`Error showing configuration: ${(error as Error).message}`,
				);
			}
		},
	},
];

/**
 * Creates logging-related CLI commands
 */
export const createLogCommands = (logService: LogService): Command[] => [
	{
		name: "log:level",
		description: "Set the logging level",
		execute: async (args: string[]): Promise<void> => {
			if (args.length === 0) {
				const config = await logService.getConfig();
				console.log(`Current log level: ${config.level}`);
				console.log("Available log levels: debug, info, warn, error");
				return;
			}

			const level = args[0].toLowerCase();
			if (!["debug", "info", "warn", "error"].includes(level)) {
				console.error("Error: Invalid log level");
				console.log("Available log levels: debug, info, warn, error");
				return;
			}

			await logService.setLevel(level as LogLevel);
			console.log(`Log level set to ${level}`);
		},
	},
	{
		name: "log:config",
		description: "Show or update logging configuration",
		execute: async (args: string[]): Promise<void> => {
			if (args.length === 0) {
				const config = await logService.getConfig();
				console.log("Current log configuration:");
				console.log(JSON.stringify(config, null, 2));
				return;
			}

			if (args[0] === "--destinations") {
				if (args.length < 2) {
					console.error("Error: Missing destinations");
					console.log("Usage: log:config --destinations console,file");
					return;
				}

				const destinations = args[1].split(",") as (
					| "console"
					| "file"
					| "none"
				)[];
				if (
					destinations.some((d) => !["console", "file", "none"].includes(d))
				) {
					console.error("Error: Invalid destination");
					console.log("Available destinations: console, file, none");
					return;
				}

				await logService.configure({ destinations });
				console.log(`Log destinations set to ${destinations.join(", ")}`);
				return;
			}

			if (args[0] === "--file") {
				if (args.length < 2) {
					console.error("Error: Missing file path");
					console.log("Usage: log:config --file <path>");
					return;
				}

				await logService.configure({ filePath: args[1] });
				console.log(`Log file set to ${args[1]}`);
				return;
			}

			if (args[0] === "--colors") {
				if (args.length < 2) {
					console.error("Error: Missing colors setting");
					console.log("Usage: log:config --colors true|false");
					return;
				}

				const colors = args[1].toLowerCase() === "true";
				await logService.configure({ colors });
				console.log(`Log colors ${colors ? "enabled" : "disabled"}`);
				return;
			}

			if (args[0] === "--timestamp") {
				if (args.length < 2) {
					console.error("Error: Missing timestamp setting");
					console.log("Usage: log:config --timestamp true|false");
					return;
				}

				const timestamp = args[1].toLowerCase() === "true";
				await logService.configure({ timestamp });
				console.log(`Log timestamps ${timestamp ? "enabled" : "disabled"}`);
				return;
			}

			console.error("Error: Invalid option");
			console.log(
				"Available options: --destinations, --file, --colors, --timestamp",
			);
		},
	},
	{
		name: "log:test",
		description: "Generate test log messages at all levels",
		execute: async (): Promise<void> => {
			await logService.debug("This is a debug message");
			await logService.info("This is an info message");
			await logService.warn("This is a warning message");
			await logService.error("This is an error message");
			console.log("Test log messages generated at all levels");
		},
	},
];

/**
 * Registers all utility commands
 */
export const registerUtilityCommands = (
	envService: EnvService,
	configService: ConfigService,
	logService: LogService,
): Command[] => [
	...createEnvCommands(envService),
	...createConfigCommands(configService),
	...createLogCommands(logService),
];
