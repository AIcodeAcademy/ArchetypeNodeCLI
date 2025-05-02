import assert from "node:assert";
import { beforeEach, describe, mock, test } from "node:test";
import { ConfigRepository } from "../../src/system/config/config.repository.ts";
import {
	type Config,
	DEFAULT_CONFIG,
} from "../../src/system/config/config.type.ts";
import { jsonUtils } from "../../src/system/json.utils.ts";

/**
 * Given ConfigRepository
 * When valid path and not config
 * Then it should load valid config
 * When path and config
 * Then it should use provided config
 * When invalid path
 * Then it should use default config
 */
describe("Given ConfigRepository", () => {
	const VALID_CONFIG_PATH = "test/f2/config.json";
	const readFileSpy = mock.method(jsonUtils, "readFromFile");
	describe("When valid path and not config", () => {
		let configRepository: ConfigRepository;
		beforeEach(() => {
			configRepository = new ConfigRepository(VALID_CONFIG_PATH);
		});
		test("Then it should load valid config", async () => {
			readFileSpy.mock.resetCalls();
			assert.strictEqual(readFileSpy.mock.calls.length, 0);
		});
	});
	describe("When path and config", () => {
		let configRepository: ConfigRepository;
		const VALID_CONFIG: Config = {
			log: {
				minLevel: "info",
				transports: [],
			},
		};
		beforeEach(() => {
			configRepository = new ConfigRepository(VALID_CONFIG_PATH, VALID_CONFIG);
		});
		test("Then it should use provided config", async () => {
			readFileSpy.mock.resetCalls();
			assert.strictEqual(readFileSpy.mock.calls.length, 0);
		});
	});
	describe("When invalid path", () => {
		let configRepository: ConfigRepository;
		beforeEach(() => {
			configRepository = new ConfigRepository("invalid/path");
		});
		test("Then it should use default config", async () => {
			const config = await configRepository.getConfig();
			assert.deepStrictEqual(config, DEFAULT_CONFIG);
		});
	});
});
