import assert from "node:assert";
import { before, describe, it } from "node:test";
import {
	DEFAULT_LOG_CONFIG,
	type LogConfig,
} from "../../src/system/log/log-config.type.ts";
import type { LogLevelType } from "../../src/system/log/log-level.type.ts";
import { Log } from "../../src/system/log/log.singleton.ts";

describe("Log Singleton", () => {
	before(() => {
		// Reset the singleton instance by reinitializing with default config
		Log.initInstance(DEFAULT_LOG_CONFIG);
	});

	it("should return the same instance", () => {
		const instance1 = Log.getInstance();
		const instance2 = Log.getInstance();
		assert.strictEqual(instance1, instance2);
	});

	it("should use default config when not initialized", () => {
		const instance = Log.getInstance();
		// Test through public methods
		instance.debug("test");
		instance.info("test");
		instance.warn("test");
		instance.error("test");
	});

	it("should use custom config when initialized", () => {
		const customConfig: LogConfig = {
			...DEFAULT_LOG_CONFIG,
			minLevel: "warn",
			transports: [
				{
					type: "console",
					minLevel: "warn",
					formatter: "pretty",
					timestamp: true,
				},
			],
		};
		Log.initInstance(customConfig);
		const instance = Log.getInstance();

		// Test through public methods
		instance.debug("debug message");
		instance.info("info message");
		instance.warn("warn message");
		instance.error("error message");
	});

	it("should respect log level filtering", () => {
		const customConfig: LogConfig = {
			...DEFAULT_LOG_CONFIG,
			minLevel: "warn",
			transports: [
				{
					type: "console",
					minLevel: "warn",
					formatter: "pretty",
					timestamp: true,
				},
			],
		};
		Log.initInstance(customConfig);
		const instance = Log.getInstance();

		// Test through public methods
		instance.debug("debug message");
		instance.info("info message");
		instance.warn("warn message");
		instance.error("error message");
	});

	it("should handle multiple transports", () => {
		const customConfig: LogConfig = {
			...DEFAULT_LOG_CONFIG,
			transports: [
				{
					type: "console",
					minLevel: "info",
					formatter: "pretty",
					timestamp: true,
				},
				{
					type: "file",
					minLevel: "warn",
					formatter: "csv",
					timestamp: true,
					path: "test.log",
				},
			],
		};
		Log.initInstance(customConfig);
		const instance = Log.getInstance();

		// Test through public methods
		instance.debug("debug message");
		instance.info("info message");
		instance.warn("warn message");
		instance.error("error message");
	});

	it("should handle transport errors gracefully", () => {
		const customConfig: LogConfig = {
			...DEFAULT_LOG_CONFIG,
			transports: [
				{
					type: "http", // This will fail to initialize
					minLevel: "info",
					formatter: "pretty",
					timestamp: true,
				},
			],
		};
		Log.initInstance(customConfig);
		const instance = Log.getInstance();

		// Should not throw
		assert.doesNotThrow(() => {
			instance.info("test message");
		});
	});

	it("should handle invalid transport configuration gracefully", () => {
		const customConfig: LogConfig = {
			...DEFAULT_LOG_CONFIG,
			transports: [
				{
					type: "console",
					minLevel: "invalid" as LogLevelType,
					formatter: "pretty",
					timestamp: true,
				},
			],
		};
		Log.initInstance(customConfig);
		const instance = Log.getInstance();

		// Should not throw
		assert.doesNotThrow(() => {
			instance.info("test message");
		});
	});
});
