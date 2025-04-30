import { strict as assert } from "node:assert";
import { describe, test } from "node:test";
import { formatLogEntry } from "../../src/system/log/formatter.utils.ts";
import type {
	LogFormatterType,
	LogTransportConfig,
} from "../../src/system/log/log-config.type.ts";
import type { LogEntry } from "../../src/system/log/log-entry.type.ts";

/**
 * @description
 * Given a log entry formatter
 * When formatting log entries
 * Then it should properly format entries according to the specified format
 */
describe("Log Entry Formatter", () => {
	const sampleLogEntry: LogEntry = {
		level: "info",
		message: "Test message",
		timestamp: "2024-04-30T12:00:00.000Z",
		context: { key: "value" },
	};

	const createConfig = (formatter: LogFormatterType): LogTransportConfig => ({
		type: "console",
		minLevel: "info",
		formatter,
		timestamp: true,
	});

	/**
	 * @description
	 * Given a log entry
	 * When formatting with pretty format
	 * Then it should return a human-readable string
	 */
	test("should format with pretty format", () => {
		const formatted = formatLogEntry(sampleLogEntry, createConfig("pretty"));
		assert.ok(
			formatted.includes("Test message"),
			"Formatted string should contain message",
		);
		assert.ok(
			formatted.includes("info"),
			"Formatted string should contain level",
		);
		assert.ok(
			formatted.includes("12:00:00"),
			"Formatted string should contain timestamp",
		);
	});

	/**
	 * @description
	 * Given a log entry
	 * When formatting with JSON format
	 * Then it should return a valid JSON string
	 */
	test("should format with JSON format", () => {
		const formatted = formatLogEntry(sampleLogEntry, createConfig("json"));
		const parsed = JSON.parse(formatted);
		assert.strictEqual(
			parsed.message,
			"Test message",
			"JSON should contain message",
		);
		assert.strictEqual(parsed.level, "info", "JSON should contain level");
		assert.strictEqual(
			parsed.timestamp,
			"2024-04-30T12:00:00.000Z",
			"JSON should contain timestamp",
		);
	});

	/**
	 * @description
	 * Given a log entry
	 * When formatting with CSV format
	 * Then it should return a valid CSV string
	 */
	test("should format with CSV format", () => {
		const formatted = formatLogEntry(sampleLogEntry, createConfig("csv"));
		assert.ok(formatted.includes("Test message"), "CSV should contain message");
		assert.ok(formatted.includes("info"), "CSV should contain level");
		assert.ok(formatted.includes("12:00:00"), "CSV should contain timestamp");
		assert.ok(formatted.includes(","), "CSV should contain commas");
	});

	/**
	 * @description
	 * Given a log entry
	 * When formatting with an invalid format
	 * Then it should return the message only
	 */
	test("should handle invalid format", () => {
		const config = {
			...createConfig("pretty"),
			formatter: "invalid" as LogFormatterType,
		};
		const formatted = formatLogEntry(sampleLogEntry, config);
		assert.strictEqual(
			formatted,
			"Test message",
			"Invalid format should return message only",
		);
	});
});
