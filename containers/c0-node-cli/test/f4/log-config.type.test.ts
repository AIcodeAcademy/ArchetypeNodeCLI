import assert from "node:assert";
import { describe, it } from "node:test";
import type {
	LogConfig,
	LogFormatterType,
	LogTransportType,
} from "../../src/system/log/log-config.type.ts";
import { DEFAULT_LOG_CONFIG } from "../../src/system/log/log-config.type.ts";

describe("Log Config Types", () => {
	it("should have correct default config", () => {
		assert.strictEqual(DEFAULT_LOG_CONFIG.minLevel, "debug");
		assert.strictEqual(DEFAULT_LOG_CONFIG.transports.length, 2);

		const consoleTransport = DEFAULT_LOG_CONFIG.transports[0];
		assert.strictEqual(consoleTransport.type, "console");
		assert.strictEqual(consoleTransport.minLevel, "info");
		assert.strictEqual(consoleTransport.formatter, "pretty");
		assert.strictEqual(consoleTransport.timestamp, false);

		const fileTransport = DEFAULT_LOG_CONFIG.transports[1];
		assert.strictEqual(fileTransport.type, "file");
		assert.strictEqual(fileTransport.minLevel, "warn");
		assert.strictEqual(fileTransport.formatter, "csv");
		assert.strictEqual(fileTransport.timestamp, true);
		assert.strictEqual(fileTransport.path, "log.csv");
	});

	it("should have valid formatter types", () => {
		const validFormatters: LogFormatterType[] = ["csv", "json", "pretty"];
		const config: LogConfig = {
			minLevel: "debug",
			transports: validFormatters.map((formatter) => ({
				type: "console",
				minLevel: "debug",
				formatter,
				timestamp: true,
			})),
		};
		assert.strictEqual(config.transports.length, validFormatters.length);
	});

	it("should have valid transport types", () => {
		const validTransports: LogTransportType[] = ["console", "file", "http"];
		const config: LogConfig = {
			minLevel: "debug",
			transports: validTransports.map((type) => ({
				type,
				minLevel: "debug",
				formatter: "pretty",
				timestamp: true,
			})),
		};
		assert.strictEqual(config.transports.length, validTransports.length);
	});

	it("should allow optional path for file transport", () => {
		const config: LogConfig = {
			minLevel: "debug",
			transports: [
				{
					type: "file",
					minLevel: "debug",
					formatter: "csv",
					timestamp: true,
				},
			],
		};
		assert.ok(config.transports[0]);
		assert.strictEqual(config.transports[0].type, "file");
	});

	it("should allow path for file transport", () => {
		const config: LogConfig = {
			minLevel: "debug",
			transports: [
				{
					type: "file",
					minLevel: "debug",
					formatter: "csv",
					timestamp: true,
					path: "custom.log",
				},
			],
		};
		assert.ok(config.transports[0]);
		assert.strictEqual(config.transports[0].type, "file");
		assert.strictEqual(config.transports[0].path, "custom.log");
	});
});
