import assert from "node:assert";
import { afterEach, beforeEach, describe, mock, test } from "node:test";
import type { LogTransportConfig } from "../../src/system/log/log-config.type.ts";
import type { LogEntry } from "../../src/system/log/log-entry.type.ts";
import { TransportConsoleRepository } from "../../src/system/log/transport-console.repository.ts";

/**
 * @feature Console Transport
 * @scenario Write log entries to console
 * Given a console transport configuration
 * When writing log entries
 * Then entries should be properly formatted and output to console
 */
describe("Given TransportConsole", () => {
	let transport: TransportConsoleRepository;
	let consoleLogSpy: ReturnType<typeof mock.method>;
	let consoleErrorSpy: ReturnType<typeof mock.method>;
	let consoleWarnSpy: ReturnType<typeof mock.method>;

	const defaultConfig: LogTransportConfig = {
		type: "console",
		minLevel: "info",
		formatter: "pretty",
		timestamp: true,
	};

	const sampleLogEntry: LogEntry = {
		level: "info",
		message: "Test message",
		timestamp: "2024-04-30T12:00:00.000Z",
		context: { key: "value" },
	};

	beforeEach(() => {
		// Arrange: Set up transport and mock console methods
		transport = new TransportConsoleRepository(defaultConfig);
		consoleLogSpy = mock.method(console, "log");
		consoleErrorSpy = mock.method(console, "error");
		consoleWarnSpy = mock.method(console, "warn");
	});

	afterEach(() => {
		// Clean up: Restore console methods
		mock.restoreAll();
	});

	describe("When writing info level log entry", () => {
		test("Then it should use console.log", () => {
			// Act: Write info level entry
			transport.write(sampleLogEntry);

			// Assert: Verify console.log was called
			assert.strictEqual(
				consoleLogSpy.mock.calls.length,
				2,
				"console.log should be called twice (message and context)",
			);
			assert.strictEqual(
				consoleErrorSpy.mock.calls.length,
				0,
				"console.error should not be called",
			);
			assert.strictEqual(
				consoleWarnSpy.mock.calls.length,
				0,
				"console.warn should not be called",
			);
		});
	});

	describe("When writing error level log entry", () => {
		test("Then it should use console.error", () => {
			// Act: Write error level entry
			transport.write({ ...sampleLogEntry, level: "error" });

			// Assert: Verify console.error was called
			assert.strictEqual(
				consoleLogSpy.mock.calls.length,
				0,
				"console.log should not be called",
			);
			assert.strictEqual(
				consoleErrorSpy.mock.calls.length,
				2,
				"console.error should be called twice (message and context)",
			);
			assert.strictEqual(
				consoleWarnSpy.mock.calls.length,
				0,
				"console.warn should not be called",
			);
		});
	});

	describe("When writing warn level log entry", () => {
		test("Then it should use console.warn", () => {
			// Act: Write warn level entry
			transport.write({ ...sampleLogEntry, level: "warn" });

			// Assert: Verify console.warn was called
			assert.strictEqual(
				consoleLogSpy.mock.calls.length,
				0,
				"console.log should not be called",
			);
			assert.strictEqual(
				consoleErrorSpy.mock.calls.length,
				0,
				"console.error should not be called",
			);
			assert.strictEqual(
				consoleWarnSpy.mock.calls.length,
				2,
				"console.warn should be called twice (message and context)",
			);
		});
	});

	describe("When writing log entry with context", () => {
		test("Then it should include context in the output", () => {
			// Act: Write entry with context
			transport.write(sampleLogEntry);

			// Assert: Verify context is included
			assert.strictEqual(
				consoleLogSpy.mock.calls.length,
				2,
				"Should log twice (message and context)",
			);
			const contextOutput = consoleLogSpy.mock.calls[1].arguments[0];
			assert.deepStrictEqual(
				contextOutput,
				sampleLogEntry.context,
				"Context should match input",
			);
		});
	});
});
