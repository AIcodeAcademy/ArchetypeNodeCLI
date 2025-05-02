import assert from "node:assert";
import { beforeEach, describe, mock, test } from "node:test";
import { fsAdapter } from "../../src/system/fs.adapter.ts";
import type { LogTransportConfig } from "../../src/system/log/log-config.type.ts";
import type { LogEntry } from "../../src/system/log/log-entry.type.ts";
import { TransportFileRepository } from "../../src/system/log/transport.-file.repository.ts";

/**
 * Given a file transport repository
 * When writing single log entry
 * Then entries should be properly written to the specified file
 * When writing multiple log entries
 * Then entries should be properly written to the specified file
 */
describe("Given TransportFile", () => {
	let transport: TransportFileRepository;
	const appendLineSpy = mock.method(fsAdapter, "appendLine", async () => {});
	const testFilePath = "test.log";
	const defaultConfig: LogTransportConfig = {
		type: "file",
		minLevel: "info",
		formatter: "csv",
		timestamp: true,
		path: testFilePath,
	};

	const sampleLogEntry: LogEntry = {
		level: "info",
		message: "Test message",
		timestamp: "2024-04-30T12:00:00.000Z",
		context: { key: "value" },
	};

	beforeEach(async () => {
		// Arrange
		appendLineSpy.mock.resetCalls();
		transport = new TransportFileRepository(defaultConfig);
	});

	describe("When writing single log entry", () => {
		test("Then the file should be created and contain the entry", async () => {
			// Act
			await transport.write(sampleLogEntry);

			// Assert
			assert.ok(appendLineSpy.mock.calls.length === 1);
		});
	});

	describe("When writing multiple log entries", () => {
		test("Then entries should be appended to the file", async () => {
			// Act
			await transport.write(sampleLogEntry);
			await transport.write({ ...sampleLogEntry, message: "Second message" });

			// Assert
			assert.ok(appendLineSpy.mock.calls.length === 2);
		});
	});
});
