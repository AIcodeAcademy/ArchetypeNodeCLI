import assert from "node:assert";
import { describe, it } from "node:test";
import { formatterFactory } from "../../src/system/log/formatter.factory.ts";
import type { LogTransportConfig } from "../../src/system/log/log-config.type.ts";
import type { LogEntry } from "../../src/system/log/log-entry.type.ts";

describe("Formatter Factory", () => {
	it("should create json formatter", () => {
		const config: LogTransportConfig = {
			type: "console",
			minLevel: "info",
			formatter: "json",
			timestamp: true,
		};
		const formatter = formatterFactory(config);
		const logEntry: LogEntry = {
			level: "info",
			message: "Test message",
			timestamp: "2023-01-01T12:00:00.000Z",
		};

		const formatted = formatter(logEntry, { addTimestamp: true });
		const parsed = JSON.parse(formatted);
		assert.strictEqual(parsed.level, "info");
		assert.strictEqual(parsed.message, "Test message");
		assert.strictEqual(parsed.timestamp, "2023-01-01T12:00:00.000Z");
	});

	it("should create pretty formatter", () => {
		const config: LogTransportConfig = {
			type: "console",
			minLevel: "info",
			formatter: "pretty",
			timestamp: true,
		};
		const formatter = formatterFactory(config);
		const logEntry: LogEntry = {
			level: "info",
			message: "Test message",
			timestamp: "2023-01-01T12:00:00.000Z",
		};

		const formatted = formatter(logEntry, { addTimestamp: true });
		assert.ok(formatted.includes("Test message"));
		assert.ok(formatted.includes("info"));
		assert.ok(formatted.includes("12:00:00"));
	});

	it("should create csv formatter", () => {
		const config: LogTransportConfig = {
			type: "console",
			minLevel: "info",
			formatter: "csv",
			timestamp: true,
		};
		const formatter = formatterFactory(config);
		const logEntry: LogEntry = {
			level: "info",
			message: "Test message",
			timestamp: "2023-01-01T12:00:00.000Z",
		};

		const formatted = formatter(logEntry, { addTimestamp: true });
		const parts = formatted.split(",");
		assert.strictEqual(parts[0], "12:00:00");
		assert.strictEqual(parts[1], "info");
		assert.strictEqual(parts[2], "Test message");
	});

	it("should respect timestamp option", () => {
		const config: LogTransportConfig = {
			type: "console",
			minLevel: "info",
			formatter: "pretty",
			timestamp: true,
		};
		const formatter = formatterFactory(config);
		const logEntry: LogEntry = {
			level: "info",
			message: "Test message",
			timestamp: "2023-01-01T12:00:00.000Z",
		};

		const withTimestamp = formatter(logEntry, { addTimestamp: true });
		const withoutTimestamp = formatter(logEntry, { addTimestamp: false });

		assert.ok(withTimestamp.includes("12:00:00"));
		assert.ok(!withoutTimestamp.includes("12:00:00"));
	});

	it("should handle unknown formatter type", () => {
		const config = {
			type: "console",
			minLevel: "info",
			formatter: "unknown",
			timestamp: true,
		} as unknown as LogTransportConfig;
		const formatter = formatterFactory(config);
		const logEntry: LogEntry = {
			level: "info",
			message: "Test message",
			timestamp: "2023-01-01T12:00:00.000Z",
		};

		const formatted = formatter(logEntry, { addTimestamp: true });
		assert.strictEqual(formatted, "Test message");
	});
});
