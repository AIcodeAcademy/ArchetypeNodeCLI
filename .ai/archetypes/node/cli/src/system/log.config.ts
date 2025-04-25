import { ConsoleTransporter } from "./console-transporter.class.ts";
import type { LogConfig } from "./log.type.ts";

export const logConfig: LogConfig = {
	minLevel: "debug",
	transports: [
		new ConsoleTransporter({
			type: "console",
			minLevel: "debug",
			formatters: ["pretty", "csv", "json"],
			timestamp: true,
		}),
	],
};
