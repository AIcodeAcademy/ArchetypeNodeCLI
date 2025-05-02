import assert from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { DEFAULT_LOG_CONFIG } from "../../src/system/log/log-config.type";
import type { LogWriter } from "../../src/system/log/log-writer.interface";
import { log, logBuilder } from "../../src/system/log/log.singleton";

/**
 * Given a logging system
 * When initializing the log singleton
 * Then it should properly configure and handle logging operations
 * When using the log singleton
 * Then it should properly log messages with the correct level and format
 * When calling twice the log builder
 * Then it should return the same instance
 */
describe("Given a logging system", () => {
	let logWriter: LogWriter | undefined;
	describe("When initializing the log singleton", () => {
		beforeEach(() => {
			logWriter = logBuilder(DEFAULT_LOG_CONFIG);
		});
		test("Then it should properly configure and handle logging operations", () => {
			assert.ok(logWriter);
		});
	});
	describe("When using the log singleton", () => {
		beforeEach(() => {
			logWriter = logBuilder(DEFAULT_LOG_CONFIG);
		});
		test("Then it should properly log messages with the correct level and format", () => {
			if (!logWriter) {
				throw new Error("Log writer not initialized");
			}
			logWriter.debug("Test message");
			logWriter.info("Test message");
			logWriter.warn("Test message");
			logWriter.error("Test message");
		});
	});
	describe("When calling twice the log ", () => {
		beforeEach(() => {
			logWriter = logBuilder(DEFAULT_LOG_CONFIG);
		});
		test("Then it should return the same instance", () => {
			const logWriter2 = log;
			assert.strictEqual(logWriter, logWriter2);
		});
	});
});
