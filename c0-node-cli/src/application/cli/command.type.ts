/**
 * Represents a CLI command with its name and options.
 */
export type Command = {
	/** Name of the command */
	name?: string;
	/** Command options and arguments */
	options: Record<string, unknown>;
};

/**
 * Default command configuration.
 * Used when no command is specified.
 */
export const DEFAULT_COMMAND: Command = {
	name: undefined,
	options: {},
};
