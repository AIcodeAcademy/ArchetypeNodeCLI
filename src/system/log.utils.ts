/**
 * Logging utility functions
 * Provides structured logging with different severity levels and formatting options
 */
export { logMessage };

function logMessage(level: string, message: string, ...args: unknown[]) {
	console.log(`[${level}] ${message}`, ...args);
}
