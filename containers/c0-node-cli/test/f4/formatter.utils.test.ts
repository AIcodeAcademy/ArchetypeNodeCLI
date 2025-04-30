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
describe("Given log entry formatter", () => {
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

	describe("When formatting with pretty format", () => {
		test("Then it should return a human-readable string", () => {
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
	});

	describe("When formatting with JSON format", () => {
		test("Then it should return a valid JSON string", () => {
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
	});

	describe("When formatting with CSV format", () => {
		test("Then it should return a valid CSV string", () => {
			const formatted = formatLogEntry(sampleLogEntry, createConfig("csv"));
			assert.ok(
				formatted.includes("Test message"),
				"CSV should contain message",
			);
			assert.ok(formatted.includes("info"), "CSV should contain level");
			assert.ok(formatted.includes("12:00:00"), "CSV should contain timestamp");
			assert.ok(formatted.includes(","), "CSV should contain commas");
		});
	});

	describe("When formatting with an invalid format", () => {
		test("Then it should return the message only", () => {
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
});
