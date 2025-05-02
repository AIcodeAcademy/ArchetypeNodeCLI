import { strict as assert } from "node:assert";
import { promises as fs } from "node:fs";
import { afterEach, beforeEach, describe, test } from "node:test";
import type { LogTransportConfig } from "../../src/system/log/log-config.type.ts";
import type { LogEntry } from "../../src/system/log/log-entry.type.ts";
import { TransportFileRepository } from "../../src/system/log/transport.-file.repository.ts";

/**
 * @feature File Transport
 * @scenario Write log entries to file
 * Given a file transport configuration
 * When writing log entries
 * Then entries should be properly written to the specified file
 */
describe("Given TransportFile", () => {
	let transport: TransportFileRepository;
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
		// Arrange: Clean up test file if it exists
		try {
			await fs.unlink(testFilePath);
		} catch (err) {
			// File doesn't exist, that's fine
		}
		transport = new TransportFileRepository(defaultConfig);
	});

	afterEach(async () => {
		// Clean up test file
		try {
			await fs.unlink(testFilePath);
		} catch (err) {
			// File doesn't exist, that's fine
		}
	});

	describe("When writing single log entry", () => {
		test("Then the file should be created and contain the entry", async () => {
			// Act: Write log entry
			await transport.write(sampleLogEntry);

			// Assert: Verify file content
			const content = await fs.readFile(testFilePath, "utf-8");
			assert.ok(
				content.includes("Test message"),
				"File should contain message",
			);
			assert.ok(content.includes("info"), "File should contain level");
		});
	});

	describe("When writing multiple log entries", () => {
		test("Then entries should be appended to the file", async () => {
			// Act: Write multiple entries
			await transport.write(sampleLogEntry);
			await transport.write({ ...sampleLogEntry, message: "Second message" });

			// Assert: Verify all entries are present
			const content = await fs.readFile(testFilePath, "utf-8");
			assert.ok(
				content.includes("Test message"),
				"File should contain first message",
			);
			assert.ok(
				content.includes("Second message"),
				"File should contain second message",
			);
		});
	});

	describe("When writing log entry with context", () => {
		test("Then the context should be included in the file", async () => {
			// Act: Write entry with context
			await transport.write(sampleLogEntry);

			// Assert: Verify context is present
			const content = await fs.readFile(testFilePath, "utf-8");
			assert.ok(content.includes("key:value"), "File should contain context");
		});
	});

	describe("When writing to non-existent directory", () => {
		test("Then the directory should be created and file written", async () => {
			// Arrange: Set up directory path
			const dirPath = "test-dir";
			const filePath = `${dirPath}/test.log`;

			const config: LogTransportConfig = {
				...defaultConfig,
				path: filePath,
			};

			transport = new TransportFileRepository(config);

			// Act: Write entry
			await transport.write(sampleLogEntry);

			// Assert: Verify file was created
			const content = await fs.readFile(filePath, "utf-8");
			assert.ok(
				content.includes("Test message"),
				"File should be created and contain message",
			);

			// Clean up
			await fs.unlink(filePath);
			await fs.rmdir(dirPath);
		});
	});
});
