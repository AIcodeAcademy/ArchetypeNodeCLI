/**
 * Configuration type definitions for the application
 */

/**
 * Severity levels for logging
 */
export type LogLevel = "debug" | "info" | "warn" | "error";

/**
 * Configuration for logging
 */
export type LogConfig = {
	level: LogLevel;
	useColors: boolean;
	includeTimestamp: boolean;
};

/**
 * Main application configuration
 */
export type AppConfig = {
	name: string;
	version: string;
	environment: string;
	log: LogConfig;
};

/**
 * Environment variables configuration
 */
export type EnvConfig = {
	NODE_ENV: string;
	LOG_LEVEL: LogLevel;
	USE_COLORS: boolean;
	APP_NAME: string;
	APP_VERSION: string;
};

/**
 * Environment variable value type
 */
export type EnvVarType = string | number | boolean;

/**
 * Format function type definition
 */
export type FormatFunction<T> = (value: string) => T;
