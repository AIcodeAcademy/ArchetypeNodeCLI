import assert from "node:assert/strict";
import { beforeEach, describe, mock, test } from "node:test";
import { meteoCommand } from "../../src/application/meteo.command.ts";
import type { MeteoOptions } from "../../src/domain/meteo.service.ts";
import { meteoService } from "../../src/domain/meteo.service.ts";
import { log } from "../../src/system/log/log.factory.ts";

// Arrange
const meteoMock = {
	country: "CountryTEST",
	city: "CityTEST",
	timezone: "TimezoneTEST",
	latitude: 43.3125,
	longitude: -8.3125,
	dailyForecasts: [{ date: "2025-04-30", max_temp: 21.1, min_temp: 11 }],
};
const getMeteoSpy = mock.method(meteoService, "getMeteo");
const logInfoSpy = mock.method(log, "info", (message: string) => {});
const logErrorSpy = mock.method(log, "error", (message: string) => {});
const options: MeteoOptions = { useCache: true };

/**
 * Given meteo.command with successful getMeteo service call
 * When runMeteoCommand is called
 * Then getMeteo service is called with options
 * And log info is called
 */
describe("Given meteo.command with successful getMeteo service call", () => {
	beforeEach(() => {
		// Arrange
		logInfoSpy.mock.resetCalls();
		logErrorSpy.mock.resetCalls();
		getMeteoSpy.mock.mockImplementation(() => Promise.resolve(meteoMock));
	});
	describe("When runMeteoCommand is called ", () => {
		beforeEach(async () => {
			// Act
			await meteoCommand.run(options);
		});
		test("Then getMeteo service is called with options ", async () => {
			// Assert
			assert.strictEqual(getMeteoSpy.mock.calls.length, 1);
			assert.strictEqual(getMeteoSpy.mock.calls[0].arguments[0], options);
		});
		test("Then log info is called ", async () => {
			// Assert
			assert.strictEqual(logInfoSpy.mock.calls.length, 1);
			assert.strictEqual(logErrorSpy.mock.calls.length, 0);
		});
	});
});

/**
 * Given meteo.command with failed getMeteo service call
 * When runMeteoCommand is called
 * Then getMeteo service is called and log error is called
 */
describe("Given meteo.command with failed getMeteo service call", () => {
	beforeEach(() => {
		// Arrange
		logInfoSpy.mock.resetCalls();
		logErrorSpy.mock.resetCalls();
		getMeteoSpy.mock.resetCalls();
		getMeteoSpy.mock.mockImplementation(() => Promise.reject(new Error("")));
	});
	describe("When runMeteoCommand is called", () => {
		beforeEach(async () => {
			// Act
			await meteoCommand.run(options);
		});
		test("Then getMeteo service is called and log error is called", async () => {
			// Assert
			assert.strictEqual(getMeteoSpy.mock.calls.length, 1);
			assert.strictEqual(logInfoSpy.mock.calls.length, 0);
			assert.strictEqual(logErrorSpy.mock.calls.length, 1);
		});
	});
});
