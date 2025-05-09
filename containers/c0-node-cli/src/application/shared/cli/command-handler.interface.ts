import type { ParseArgsOptionsConfig } from "node:util";

export interface CommandHandler<T extends Record<string, unknown>> {
	parseOptions: ParseArgsOptionsConfig;
	run(options: T): Promise<void>;
}
