export type Command = {
	name: string;
	options: Record<string, unknown>;
};

export const DEFAULT_COMMAND: Command = {
	name: "",
	options: {},
};
