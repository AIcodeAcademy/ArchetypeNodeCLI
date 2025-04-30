import { strict as assert } from "node:assert";
import { afterEach, beforeEach, describe, mock, test } from "node:test";
import type { LogTransportConfig } from "../../src/system/log/log-config.type.ts";
import type { LogEntry } from "../../src/system/log/log-entry.type.ts";
import { TransportConsole } from "../../src/system/log/transport-console.repository.ts";

/**
 * @description
 * Given a console transport
 * When writing log entries
 * Then it should properly format and output to console
 */
describe("Console Transport", () => {
	let transport: TransportConsole;
	let consoleLogSpy: ReturnType<typeof mock.method>;
	let consoleErrorSpy: ReturnType<typeof mock.method>;
	let consoleWarnSpy: ReturnType<typeof mock.method>;

	const sampleLogEntry: LogEntry = {
		level: "info",
		message: "Test message",
		timestamp: "2024-04-30T12:00:00.000Z",
		context: { key: "value" },
	};

	const defaultConfig: LogTransportConfig = {
		type: "console",
		minLevel: "info",
		formatter: "pretty",
		timestamp: true,
	};

	beforeEach(() => {
		transport = new TransportConsole(defaultConfig);
		// Mock console methods
		consoleLogSpy = mock.method(console, "log");
		consoleErrorSpy = mock.method(console, "error");
		consoleWarnSpy = mock.method(console, "warn");
	});

	afterEach(() => {
		// Restore console methods
		mock.restoreAll();
	});

	/**
	 * @description
	 * Given a console transport
	 * When writing an info level log entry
	 * Then it should use console.log
	 */
	test("should use console.log for info level", () => {
		transport.write(sampleLogEntry);
		assert.strictEqual(consoleLogSpy.mock.calls.length, 1);
		assert.strictEqual(consoleErrorSpy.mock.calls.length, 0);
		assert.strictEqual(consoleWarnSpy.mock.calls.length, 0);
	});

	/**
	 * @description
	 * Given a console transport
	 * When writing an error level log entry
	 * Then it should use console.error
	 */
	test("should use console.error for error level", () => {
		transport.write({ ...sampleLogEntry, level: "error" });
		assert.strictEqual(consoleLogSpy.mock.calls.length, 1);
		assert.strictEqual(consoleErrorSpy.mock.calls.length, 0);
		assert.strictEqual(consoleWarnSpy.mock.calls.length, 0);
	});

	/**
	 * @description
	 * Given a console transport
	 * When writing a warn level log entry
	 * Then it should use console.warn
	 */
	test("should use console.warn for warn level", () => {
		transport.write({ ...sampleLogEntry, level: "warn" });
		assert.strictEqual(consoleLogSpy.mock.calls.length, 1);
		assert.strictEqual(consoleErrorSpy.mock.calls.length, 0);
		assert.strictEqual(consoleWarnSpy.mock.calls.length, 0);
	});

	/**
	 * @description
	 * Given a console transport
	 * When writing a log entry with context
	 * Then it should include context in the output
	 */
	test("should include context in output", () => {
		transport.write(sampleLogEntry);
		assert.strictEqual(consoleLogSpy.mock.calls.length, 2); // One for message, one for context
		const contextOutput = consoleLogSpy.mock.calls[1].arguments[0];
		assert.deepStrictEqual(contextOutput, sampleLogEntry.context);
	});
});
