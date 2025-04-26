import { ConsoleTransport } from "./console-transport.repository.ts";
import { FileTransport } from "./fs-transporter.repository.ts";
import { DEFAULT_LOG_CONFIG, type LogConfig } from "./log-config.type.ts";
import type {
	LogEntry,
	LogLevelType,
	LogTransport,
	LogTransportConfig,
	LogTransportType,
} from "./log.type";

type TransportConstructor = (transport: LogTransportConfig) => LogTransport;
const transportConstructors: Record<LogTransportType, TransportConstructor> = {
	console: (transport) => new ConsoleTransport(transport),
	file: (transport) => new FileTransport(transport),
	http: () => {
		throw new Error("HTTP transport not implemented");
	},
};

export class LogService {
	private static instance: LogService | null = null;
	private readonly logConfig: LogConfig;
	private readonly transports: LogTransport[];

	private constructor(logConfig: LogConfig) {
		this.logConfig = logConfig;
		this.transports = logConfig.transports.map((transportConfig) => {
			const ctor = transportConstructors[transportConfig.type];
			if (!ctor)
				throw new Error(`Unknown transport type: ${transportConfig.type}`);
			return ctor(transportConfig);
		});
	}

	public static getInstance(logConfig?: LogConfig): LogService {
		if (LogService.instance) {
			return LogService.instance;
		}
		if (!logConfig) {
			const temporalDefaultLogger = new LogService(DEFAULT_LOG_CONFIG);
			return temporalDefaultLogger;
		}
		LogService.instance = new LogService(logConfig);
		return LogService.instance;
	}

	debug(message: string, context?: unknown) {
		this.write(this.createEntry("debug", message, context));
	}

	info(message: string, context?: unknown) {
		this.write(this.createEntry("info", message, context));
	}

	warn(message: string, context?: unknown) {
		this.write(this.createEntry("warn", message, context));
	}

	error(message: string, context?: unknown) {
		this.write(this.createEntry("error", message, context));
	}
	createEntry(level: LogLevelType, message: string, context?: unknown) {
		return {
			level,
			message,
			context,
			timestamp: new Date().toISOString(),
		};
	}
	write(logEntry: LogEntry) {
		for (const transport of this.transports) {
			if (logEntry.level < this.logConfig.minLevel) {
				continue;
			}
			transport.write(logEntry);
		}
	}
}

export const logger = () => LogService.getInstance();
