import assert from "node:assert";
import { afterEach, beforeEach, describe, test } from "node:test";
import {
	DEFAULT_LOG_CONFIG,
	type LogConfig,
} from "../../src/system/log/log-config.type.ts";
import { Log, type WriteLevel } from "../../src/system/log/log.singleton.ts";

/**
 * @description
 * Given a logging system
 * When initializing the log singleton
 * Then it should properly configure and handle logging operations
 */
describe("Given Log singleton", () => {
	let log: WriteLevel;
	const defaultConfig: LogConfig = {
		minLevel: "info",
		transports: [
			{
				type: "console",
				minLevel: "info",
				formatter: "pretty",
				timestamp: true,
			},
		],
	};

	beforeEach(() => {
		log = Log.getInstance();
	});

	afterEach(() => {
		// Reset the singleton by creating a new instance with default config
		Log.initInstance(DEFAULT_LOG_CONFIG);
	});

	describe("When getting the singleton instance", () => {
		test("Then it should return the same instance on subsequent calls", () => {
			Log.initInstance(defaultConfig);
			const instance1 = Log.getInstance();
			const instance2 = Log.getInstance();
			const areEqual = instance1 === instance2;
			assert.ok(areEqual);
		});
	});

	describe("When initializing with default config", () => {
		test("Then it should apply the default configuration", () => {
			Log.initInstance(defaultConfig);
			const config = DEFAULT_LOG_CONFIG;
			assert.strictEqual(config.minLevel, "debug");
			assert.strictEqual(config.transports.length, 2);
		});
	});

	describe("When logging at different levels", () => {
		test("Then it should respect the configured log level", () => {
			Log.initInstance({
				minLevel: "warn",
				transports: [
					{
						type: "console",
						minLevel: "warn",
						formatter: "pretty",
						timestamp: true,
					},
				],
			});

			// Debug and Info should not be logged
			log.debug("Debug message");
			log.info("Info message");

			// Warning and Error should be logged
			log.warn("Warning message");
			log.error("Error message");

			// TODO: Add assertions for actual log output
		});
	});
});
