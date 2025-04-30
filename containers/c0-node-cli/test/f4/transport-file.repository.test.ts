import { strict as assert } from "node:assert";
import { promises as fs } from "node:fs";
import { afterEach, beforeEach, describe, test } from "node:test";
import type { LogTransportConfig } from "../../src/system/log/log-config.type.ts";
import type { LogEntry } from "../../src/system/log/log-entry.type.ts";
import { TransportFile } from "../../src/system/log/transport.-file.repository.ts";

/**
 * @description
 * Given a file transport
 * When writing log entries
 * Then it should properly write to the specified file
 */
describe("File Transport", () => {
	let transport: TransportFile;
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
		// Clean up test file if it exists
		try {
			await fs.unlink(testFilePath);
		} catch (err) {
			// File doesn't exist, that's fine
		}
		transport = new TransportFile(defaultConfig);
	});

	afterEach(async () => {
		// Clean up test file
		try {
			await fs.unlink(testFilePath);
		} catch (err) {
			// File doesn't exist, that's fine
		}
	});

	/**
	 * @description
	 * Given a file transport
	 * When writing a log entry
	 * Then it should create the file and write the entry
	 */
	test("should write log entry to file", async () => {
		await transport.write(sampleLogEntry);
		const content = await fs.readFile(testFilePath, "utf-8");
		assert.ok(content.includes("Test message"), "File should contain message");
		assert.ok(content.includes("info"), "File should contain level");
	});

	/**
	 * @description
	 * Given a file transport
	 * When writing multiple log entries
	 * Then it should append entries to the file
	 */
	test("should append multiple log entries", async () => {
		await transport.write(sampleLogEntry);
		await transport.write({ ...sampleLogEntry, message: "Second message" });
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

	/**
	 * @description
	 * Given a file transport
	 * When writing a log entry with context
	 * Then it should include context in the file
	 */
	test("should include context in file", async () => {
		await transport.write(sampleLogEntry);
		const content = await fs.readFile(testFilePath, "utf-8");
		assert.ok(content.includes('"key":"value"'), "File should contain context");
	});

	/**
	 * @description
	 * Given a file transport
	 * When writing to a non-existent directory
	 * Then it should create the directory and write the file
	 */
	test("should create directory if it does not exist", async () => {
		const dirPath = "test-dir";
		const filePath = `${dirPath}/test.log`;

		const config: LogTransportConfig = {
			...defaultConfig,
			path: filePath,
		};

		transport = new TransportFile(config);
		await transport.write(sampleLogEntry);
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
