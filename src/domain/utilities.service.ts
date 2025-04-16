/**
 * Service interfaces for the utilities ecosystem
 */
import { LogConfig, LogLevel } from "../system/log.utils.js";

/**
 * Service interface for environment variable access
 */
export type EnvService = {
	getString: (name: string, defaultValue?: string) => Promise<string>;
	getNumber: (name: string, defaultValue?: number) => Promise<number>;
	getBoolean: (name: string, defaultValue?: boolean) => Promise<boolean>;
	isSet: (name: string) => Promise<boolean>;
	getAll: () => Promise<Record<string, string>>;
};

/**
 * Service interface for configuration management
 */
export type ConfigService<T = Record<string, unknown>> = {
	load: (filePath?: string) => Promise<T>;
	get: <V>(key: string, defaultValue?: V) => Promise<V>;
	set: <V>(key: string, value: V) => Promise<void>;
	save: (filePath?: string) => Promise<void>;
	getFullConfig: () => Promise<T>;
};

/**
 * Service interface for logging operations
 */
export type LogService = {
	debug: (message: string, data?: unknown) => Promise<void>;
	info: (message: string, data?: unknown) => Promise<void>;
	warn: (message: string, data?: unknown) => Promise<void>;
	error: (message: string, data?: unknown) => Promise<void>;
	configure: (config: Partial<LogConfig>) => Promise<void>;
	setLevel: (level: LogLevel) => Promise<void>;
	getConfig: () => Promise<LogConfig>;
};

/**
 * Service interface for file system operations
 */
export type FileSystemService = {
	readTextFile: (path: string) => Promise<string>;
	writeTextFile: (path: string, content: string) => Promise<void>;
	readJsonFile: <T>(path: string) => Promise<T>;
	writeJsonFile: <T>(path: string, data: T) => Promise<void>;
	fileExists: (path: string) => Promise<boolean>;
	directoryExists: (path: string) => Promise<boolean>;
	createDirectory: (path: string) => Promise<void>;
	listFiles: (
		path: string,
		pattern?: RegExp,
		recursive?: boolean,
	) => Promise<string[]>;
	resolvePath: (...segments: string[]) => string;
};

/**
 * Creates an environment service implementation
 */
export const createEnvService = (
	getEnvString: (name: string, defaultValue?: string) => Promise<string>,
	getEnvNumber: (name: string, defaultValue?: number) => Promise<number>,
	getEnvBoolean: (name: string, defaultValue?: boolean) => Promise<boolean>,
	checkEnvExists: (name: string) => Promise<boolean>,
	getAllEnv: () => Promise<Record<string, string>>,
): EnvService => ({
	getString: getEnvString,
	getNumber: getEnvNumber,
	getBoolean: getEnvBoolean,
	isSet: checkEnvExists,
	getAll: getAllEnv,
});

/**
 * Creates a configuration service implementation
 */
export const createConfigService = <T>(
	loadConfig: (filePath?: string) => Promise<T>,
	getConfigValue: <V>(key: string, defaultValue?: V) => Promise<V>,
	setConfigValue: <V>(key: string, value: V) => Promise<void>,
	saveConfig: (filePath?: string) => Promise<void>,
	getConfig: () => Promise<T>,
): ConfigService<T> => ({
	load: loadConfig,
	get: getConfigValue,
	set: setConfigValue,
	save: saveConfig,
	getFullConfig: getConfig,
});

/**
 * Creates a logging service implementation
 */
export const createLogService = (
	logDebugMessage: (message: string, data?: unknown) => Promise<void>,
	logInfoMessage: (message: string, data?: unknown) => Promise<void>,
	logWarnMessage: (message: string, data?: unknown) => Promise<void>,
	logErrorMessage: (message: string, data?: unknown) => Promise<void>,
	configureLog: (config: Partial<LogConfig>) => Promise<void>,
	setLogLevel: (level: LogLevel) => Promise<void>,
	getLogConfig: () => Promise<LogConfig>,
): LogService => ({
	debug: logDebugMessage,
	info: logInfoMessage,
	warn: logWarnMessage,
	error: logErrorMessage,
	configure: configureLog,
	setLevel: setLogLevel,
	getConfig: getLogConfig,
});

/**
 * Creates a file system service implementation
 */
export const createFileSystemService = (
	readText: (path: string) => Promise<string>,
	writeText: (path: string, content: string) => Promise<void>,
	readJson: <T>(path: string) => Promise<T>,
	writeJson: <T>(path: string, data: T) => Promise<void>,
	checkFileExists: (path: string) => Promise<boolean>,
	checkDirectoryExists: (path: string) => Promise<boolean>,
	makeDirectory: (path: string) => Promise<void>,
	listDirectoryFiles: (
		path: string,
		pattern?: RegExp,
		recursive?: boolean,
	) => Promise<string[]>,
	resolveFilePath: (...segments: string[]) => string,
): FileSystemService => ({
	readTextFile: readText,
	writeTextFile: writeText,
	readJsonFile: readJson,
	writeJsonFile: writeJson,
	fileExists: checkFileExists,
	directoryExists: checkDirectoryExists,
	createDirectory: makeDirectory,
	listFiles: listDirectoryFiles,
	resolvePath: resolveFilePath,
});
