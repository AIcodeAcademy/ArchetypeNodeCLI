import { strict as assert } from "node:assert";
import { describe, test } from "node:test";
import { formatterFactory } from "../../src/system/log/formatter.factory.ts";
import type {
	LogFormatterType,
	LogTransportConfig,
} from "../../src/system/log/log-config.type.ts";
import type { LogEntry } from "../../src/system/log/log-entry.type.ts";

/**
 * @description
 * Given a logging formatter factory
 * When creating different types of formatters
 * Then it should properly format log entries according to the specified format
 */
describe("Given formatterFactory", () => {
	const sampleLogEntry: LogEntry = {
		level: "info",
		message: "Test message",
		timestamp: "2024-04-30T12:00:00.000Z",
		context: { key: "value" },
	};

	const createTransportConfig = (
		formatter: LogFormatterType,
	): LogTransportConfig => ({
		type: "console",
		minLevel: "info",
		formatter,
		timestamp: true,
	});

	describe("When creating pretty formatter", () => {
		test("Then it should return a human-readable formatted string", () => {
			const formatter = formatterFactory(createTransportConfig("pretty"));
			const formatted = formatter(sampleLogEntry, { addTimestamp: true });
			assert.ok(
				formatted.includes("Test message"),
				"Formatted string should contain the message",
			);
			assert.ok(
				formatted.includes("info"),
				"Formatted string should contain the level",
			);
		});
	});

	describe("When creating JSON formatter", () => {
		test("Then it should return a valid JSON string", () => {
			const formatter = formatterFactory(createTransportConfig("json"));
			const formatted = formatter(sampleLogEntry, { addTimestamp: true });
			const parsed = JSON.parse(formatted);
			assert.strictEqual(
				parsed.message,
				"Test message",
				"JSON should contain the message",
			);
			assert.strictEqual(parsed.level, "info", "JSON should contain the level");
		});
	});

	describe("When creating CSV formatter", () => {
		test("Then it should return a valid CSV string", () => {
			const formatter = formatterFactory(createTransportConfig("csv"));
			const formatted = formatter(sampleLogEntry, { addTimestamp: true });
			assert.ok(
				formatted.includes("Test message"),
				"CSV should contain the message",
			);
			assert.ok(formatted.includes("info"), "CSV should contain the level");
			assert.ok(formatted.includes(","), "CSV should contain commas");
		});
	});

	describe("When creating formatter with invalid type", () => {
		test("Then it should return a default formatter", () => {
			const config = {
				...createTransportConfig("pretty"),
				formatter: "invalid" as LogFormatterType,
			};
			const formatter = formatterFactory(config);
			const formatted = formatter(sampleLogEntry, { addTimestamp: true });
			assert.strictEqual(
				formatted,
				"Test message",
				"Invalid formatter should return message only",
			);
		});
	});
});
