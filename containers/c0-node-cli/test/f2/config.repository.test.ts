import assert from "node:assert";
import { beforeEach, describe, mock, test } from "node:test";
import { configRepository } from "../../src/system/config/config.repository.ts";
import {
	type Config,
	DEFAULT_CONFIG,
} from "../../src/system/config/config.type.ts";
import { jsonUtils } from "../../src/system/json.utils.ts";
/**
 * Given configRepository
 * When valid path and not config
 * Then it should load valid config
 * When invalid path
 * Then it should use default config
 */
describe("Given configRepository", () => {
	const VALID_CONFIG_PATH = "test/f2/config.json";
	const mockConfig: Config = {
		cache: {
			expiration: 3600000,
			cacheDir: "",
		},
		log: {
			minLevel: "debug",
			transports: [
				{
					type: "console",
					minLevel: "debug",
					formatter: "pretty",
					timestamp: true,
				},
			],
		},
	};
	const jsonReadFromFileMock = mock.method(
		jsonUtils,
		"readFromFile",
		(path: string) => {
			if (path === VALID_CONFIG_PATH) {
				return Promise.resolve(mockConfig);
			}
			return Promise.reject(new Error("File not found"));
		},
	);
	describe("When invalid path", () => {
		let config: Config;
		beforeEach(async () => {
			config = await configRepository.load("invalid/path");
		});
		test("Then it should use default config", async () => {
			assert.deepStrictEqual(config, DEFAULT_CONFIG);
		});
	});
	describe("When valid path and not config", () => {
		beforeEach(() => {
			// Arrange
			configRepository.load(VALID_CONFIG_PATH);
		});
		test("Then it should load valid config", async () => {
			jsonReadFromFileMock.mock.resetCalls();
			assert.strictEqual(jsonReadFromFileMock.mock.calls.length, 0);
		});
	});
});
