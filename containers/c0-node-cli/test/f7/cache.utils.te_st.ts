import assert from "node:assert";
import { afterEach, beforeEach, describe, mock, test } from "node:test";
import { cache } from "../../src/domain/cache.utils.ts";
import { readJsonFile, writeJsonFile } from "../../src/system/json.utils.ts";

interface CacheData<T> {
	value: T;
	timestamp: number;
}

/**
 * @feature Cache Utilities
 * @description Tests for caching utility functions
 *
 * @scenario Save Cache
 * Given a cache save function
 * When data is saved to cache
 * Then it should write the data to a JSON file with timestamp
 *
 * @scenario Load Cache
 * Given a cache load function
 * When data is loaded from cache
 * Then it should return the cached value if it exists
 * Then it should return undefined if the cache doesn't exist
 */
describe("Cache Utilities", () => {
	let writeJsonFileSpy: ReturnType<typeof mock.method>;
	let readJsonFileSpy: ReturnType<typeof mock.method>;

	beforeEach(() => {
		// Mock the json utils
		writeJsonFileSpy = mock.method(
			writeJsonFile,
			async (path: string, data: unknown) => {},
		);
		readJsonFileSpy = mock.method(readJsonFile, async (path: string) => null);
	});

	afterEach(() => {
		mock.reset();
	});

	describe("Save Cache", () => {
		test("should save data to cache with timestamp", async () => {
			// Arrange
			const key = "test-key";
			const value = { test: "data" };

			// Act
			await cache.save(key, value);

			// Assert
			assert.strictEqual(writeJsonFileSpy.mock.calls.length, 1);
			const [path, data] = writeJsonFileSpy.mock.calls[0].arguments;
			assert.strictEqual(path, `./${key}.json`);
			const cacheData = data as CacheData<typeof value>;
			assert.deepStrictEqual(cacheData.value, value);
			assert.ok(typeof cacheData.timestamp === "number");
		});
	});

	describe("Load Cache", () => {
		test("should return cached value if it exists", async () => {
			// Arrange
			const key = "test-key";
			const value = { test: "data" };
			readJsonFileSpy = mock.method(readJsonFile, async (path: string) => ({
				value,
				timestamp: Date.now(),
			}));

			// Act
			const result = await cache.load(key);

			// Assert
			assert.strictEqual(readJsonFileSpy.mock.calls.length, 1);
			assert.strictEqual(
				readJsonFileSpy.mock.calls[0].arguments[0],
				`./${key}.json`,
			);
			assert.deepStrictEqual(result, value);
		});

		test("should return undefined if cache doesn't exist", async () => {
			// Arrange
			const key = "non-existent-key";
			readJsonFileSpy = mock.method(readJsonFile, async (path: string) => {
				throw new Error("File not found");
			});

			// Act
			const result = await cache.load(key);

			// Assert
			assert.strictEqual(readJsonFileSpy.mock.calls.length, 1);
			assert.strictEqual(
				readJsonFileSpy.mock.calls[0].arguments[0],
				`./${key}.json`,
			);
			assert.strictEqual(result, undefined);
		});
	});
});
