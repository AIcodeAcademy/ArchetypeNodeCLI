export interface CommandHandler {
	run(options: Record<string, unknown>): Promise<void>;
}
