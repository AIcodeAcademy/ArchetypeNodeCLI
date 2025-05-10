import type { ParseArgsOptionsConfig } from "node:util";

/**
 * Interface for command handlers.
 * Defines the structure and behavior of CLI commands.
 * @template T - Type of command options
 */
export interface CommandHandler<T extends Record<string, unknown>> {
	/** CLI argument parsing options for the command */
	parseOptions: ParseArgsOptionsConfig;
	/**
	 * Executes the command with the provided options.
	 * @param {T} options - Command options
	 * @returns {Promise<void>}
	 */
	run(options: T): Promise<void>;
}
