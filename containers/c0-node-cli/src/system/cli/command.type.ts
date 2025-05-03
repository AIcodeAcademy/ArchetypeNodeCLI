export type Command = {
	name: string;
	options: unknown;
};

export const DEFAULT_COMMAND: Command = {
	name: "",
	options: {},
};
