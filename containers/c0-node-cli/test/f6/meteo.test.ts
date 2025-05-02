import assert from "node:assert";
import { afterEach, beforeEach, describe, mock, test } from "node:test";
import { meteoCommand } from "../../src/application/meteo.command.ts";
import { meteoService } from "../../src/domain/meteo.service.ts";
import type { Meteo } from "../../src/domain/meteo.type.ts";
import { cacheRepository } from "../../src/system/cache/cache.repository.ts";
import { ipApiRepository } from "../../src/system/ip-api.repository.ts";
import { log } from "../../src/system/log/log.singleton.ts";
import { openMeteoRepository } from "../../src/system/open-meteo.repository.ts";

/**
 * @feature Weather Forecast
 * @scenario Get weather forecast for current location
 * Given I have internet access
 * When I run the weather command
 * Then I get weather data for my current location
 * And the data includes city, country, and daily forecasts
 */
describe("Weather Forecast Feature", () => {
	const mockIpApi = {
		status: "success",
		country: "Test Country",
		city: "Test City",
		lat: 0,
		lon: 0,
	};

	const mockOpenMeteo = {
		latitude: 0,
		longitude: 0,
		timezone: "UTC",
		daily: {
			time: ["2024-01-01"],
			temperature_2m_max: [20],
			temperature_2m_min: [10],
		},
	};

	const expectedMeteo: Meteo = {
		country: "Test Country",
		city: "Test City",
		timezone: "UTC",
		latitude: 0,
		longitude: 0,
		dailyForecasts: [
			{
				date: "2024-01-01",
				max_temp: 20,
				min_temp: 10,
			},
		],
	};

	let logInfoSpy: ReturnType<typeof mock.method>;
	let logErrorSpy: ReturnType<typeof mock.method>;

	beforeEach(() => {
		// Mock the repositories
		mock.method(ipApiRepository, "getIpApi", async () => mockIpApi);
		mock.method(openMeteoRepository, "getOpenMeteo", async () => mockOpenMeteo);
		mock.method(cacheRepository, "load", async () => null);
		mock.method(cacheRepository, "save", async () => {});

		// Mock the logger
		logInfoSpy = mock.method(log, "info", (message: string) => {});
		logErrorSpy = mock.method(log, "error", (message: string) => {});
	});

	afterEach(() => {
		mock.reset();
	});

	describe("When getting weather data", () => {
		test("should return weather data for current location", async () => {
			// Arrange
			const options = { useCache: false };

			// Act
			const result = await meteoService.getMeteo(options);

			// Assert
			assert.deepStrictEqual(result, expectedMeteo);
		});

		test("should use cached location data when cache is enabled", async () => {
			// Arrange
			const options = { useCache: true };
			mock.method(cacheRepository, "load", async () => mockIpApi);

			// Act
			const result = await meteoService.getMeteo(options);

			// Assert
			assert.deepStrictEqual(result, expectedMeteo);
			const calls = mock.method(ipApiRepository, "getIpApi").mock.calls;
			assert.strictEqual(
				calls.length,
				0,
				"Should not call IP API when using cache",
			);
		});

		test("should handle API errors gracefully", async () => {
			// Arrange
			const options = { useCache: false };
			mock.method(ipApiRepository, "getIpApi", async () => {
				throw new Error("API Error");
			});

			// Act & Assert
			await assert.rejects(
				async () => await meteoService.getMeteo(options),
				/API Error/,
			);
		});
	});

	describe("When running the weather command", () => {
		test("should log weather data on success", async () => {
			// Arrange
			const options = { useCache: false };

			// Act
			await meteoCommand.run(options);

			// Assert
			assert.strictEqual(logInfoSpy.mock.calls.length, 1, "Should log once");
			assert.match(
				logInfoSpy.mock.calls[0].arguments[0] as string,
				/My meteorological data/,
			);
		});

		test("should log error on failure", async () => {
			// Arrange
			const options = { useCache: false };
			mock.method(ipApiRepository, "getIpApi", async () => {
				throw new Error("API Error");
			});

			// Act
			await meteoCommand.run(options);

			// Assert
			assert.strictEqual(logErrorSpy.mock.calls.length, 1, "Should log once");
			assert.match(
				logErrorSpy.mock.calls[0].arguments[0] as string,
				/Error getting my meteorological data/,
			);
		});
	});
});
