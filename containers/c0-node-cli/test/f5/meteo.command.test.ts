import assert from "node:assert/strict";
import { beforeEach, describe, mock, test } from "node:test";
import { runMeteoCommand } from "../../src/application/meteo.command.ts";
import type { MeteoOptions } from "../../src/domain/meteo.service.ts";
import { meteoService } from "../../src/domain/meteo.service.ts";
import { logService } from "../../src/system/log/log.service.ts";

const mockedMeteo = {
	country: "SpainTEST",
	city: "A CoruñaTEST",
	timezone: "Europe/MadridTEST",
	latitude: 43.3125,
	longitude: -8.3125,
	dailyForecasts: [
		{ date: "2025-04-30", max_temp: 21.1, min_temp: 11 },
		{ date: "2025-05-01", max_temp: 21.4, min_temp: 10.5 },
		{ date: "2025-05-02", max_temp: 20.9, min_temp: 13.2 },
		{ date: "2025-05-03", max_temp: 20.2, min_temp: 13.6 },
		{ date: "2025-05-04", max_temp: 17.2, min_temp: 13.2 },
		{ date: "2025-05-05", max_temp: 17.5, min_temp: 11 },
		{ date: "2025-05-06", max_temp: 16.7, min_temp: 10.2 },
	],
};
const mockGetMeteo = mock.method(meteoService, "getMeteo", async () => {
	return mockedMeteo;
});
let logInfoCalls: string[] = [];
let logErrorCalls: string[] = [];
const spyLog = mock.method(logService, "log", () => {
	return {
		info: (message: string) => {
			logInfoCalls.push(message);
		},
		error: (message: string) => {
			logErrorCalls.push(message);
		},
	};
});
const options: MeteoOptions = { useCache: false };
describe("Given meteo.command with successful getMeteo service call", () => {
	beforeEach(() => {
		logInfoCalls = [];
		logErrorCalls = [];
	});
	describe("When runMeteoCommand is called ", () => {
		test("Then getMeteo service is called and log info is called", async () => {
			mockGetMeteo.mock.mockImplementation(() => Promise.resolve(mockedMeteo));
			await runMeteoCommand(options);
			assert.strictEqual(mockGetMeteo.mock.calls.length, 1);
			assert.strictEqual(logInfoCalls.length, 1);
			assert.strictEqual(logErrorCalls.length, 0);
		});
	});
});
describe("Given meteo.command with failed getMeteo service call", () => {
	beforeEach(() => {
		logInfoCalls = [];
		logErrorCalls = [];
	});
	describe("When runMeteoCommand is called", () => {
		test("Then getMeteo service is called and log error is called", async () => {
			mockGetMeteo.mock.mockImplementation(() =>
				Promise.reject(new Error("Error")),
			);
			await runMeteoCommand(options);
			assert.strictEqual(mockGetMeteo.mock.calls.length, 2);
			assert.strictEqual(logInfoCalls.length, 0);
			assert.strictEqual(logErrorCalls.length, 1);
		});
	});
});
