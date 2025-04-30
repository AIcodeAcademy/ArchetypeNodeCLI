import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { runMeteoCommand } from "../../src/application/meteo.command.ts";
import type { MeteoOptions } from "../../src/domain/meteo.service.ts";
import type { Meteo } from "../../src/domain/meteo.type.ts";
import type { Log } from "../../src/system/log/log.singleton.ts";

describe("meteo.command", () => {
	let originalGetMeteo: ((options: MeteoOptions) => Promise<Meteo>) | undefined;
	let originalGetLog: (() => Log) | undefined;
	let logSpy: {
		debug: (message: string, context?: unknown) => void;
		info: (message: string, context?: unknown) => void;
		warn: (message: string, context?: unknown) => void;
		error: (message: string, context?: unknown) => void;
	};

	beforeEach(() => {
		// Store original implementations
		originalGetMeteo = (
			global as { getMeteo?: (options: MeteoOptions) => Promise<Meteo> }
		).getMeteo;
		originalGetLog = (global as { getLog?: () => Log }).getLog;

		// Mock implementations
		(
			global as { getMeteo?: (options: MeteoOptions) => Promise<Meteo> }
		).getMeteo = async (options) => {
			if (options.useCache) {
				throw new Error("Test error");
			}
			return {
				country: "UK",
				city: "London",
				timezone: "Europe/London",
				latitude: 51.5074,
				longitude: -0.1278,
				dailyForecasts: [],
			};
		};

		// Create spy log
		logSpy = {
			debug: (message: string, context?: unknown) => {},
			info: (message: string, context?: unknown) => {},
			warn: (message: string, context?: unknown) => {},
			error: (message: string, context?: unknown) => {},
		};
		(global as { getLog?: () => Log }).getLog = () => logSpy as unknown as Log;
	});

	afterEach(() => {
		// Restore original implementations
		(
			global as { getMeteo?: (options: MeteoOptions) => Promise<Meteo> }
		).getMeteo = originalGetMeteo;
		(global as { getLog?: () => Log }).getLog = originalGetLog;
	});

	it("should exist and be a function", () => {
		assert.strictEqual(typeof runMeteoCommand, "function");
	});

	it("should log success when getMeteo succeeds", async () => {
		// Arrange
		let loggedMessage = "";
		let loggedContext: unknown;
		logSpy.info = (message, context) => {
			loggedMessage = message;
			loggedContext = context;
		};

		// Act
		await runMeteoCommand({ useCache: false });

		// Assert
		assert.strictEqual(loggedMessage, "My meteorological data");
		assert.ok(loggedContext);
	});

	it("should log error when getMeteo fails", async () => {
		// Arrange
		let loggedMessage = "";
		let loggedContext: unknown;
		logSpy.error = (message, context) => {
			loggedMessage = message;
			loggedContext = context;
		};

		// Act
		await runMeteoCommand({ useCache: true });

		// Assert
		assert.strictEqual(loggedMessage, "Error getting my meteorological data");
		assert.ok(loggedContext instanceof Error);
		assert.strictEqual((loggedContext as Error).message, "Test error");
	});
});
