import assert from "node:assert";
import { describe, mock, test } from "node:test";
import { DEFAULT_CACHE_CONFIG } from "../../src/shared/cache/cache-config.type.ts";
import type { CacheEntry } from "../../src/shared/cache/cache-entry.type.ts";
import { cache } from "../../src/shared/cache/cache.service.ts";
import { file } from "../../src/shared/file/file.adapter.ts";

/**
 * Given a cache service
 *  When saving data to memory cache
 *   Then it should store the data in memory
 *  When retrieving data from memory cache
 *   Then it should return the stored data
 *   Then it should return undefined for expired data
 *  When saving data to file cache
 *   Then it should store the data in a file
 *  When retrieving data from file cache
 *   Then it should return the stored data
 *   Then it should return undefined for expired data
 */
describe("Given a cache service", () => {
	const testKey = "test-key";
	type TestValue = { data: string };
	const testValue: TestValue = { data: "test" };
	const memoryConfig = {
		...DEFAULT_CACHE_CONFIG,
		repository: "memory" as const,
	};
	const fileConfig = {
		...DEFAULT_CACHE_CONFIG,
		repository: "file" as const,
		directory: "./temp/test-cache",
	};

	describe("When saving data to memory cache", () => {
		test("Then it should store the data in memory", async () => {
			// Arrange
			// Act
			await cache.set(testKey, testValue, memoryConfig);

			// Assert
			const actual = await cache.get(testKey, memoryConfig);
			assert.deepStrictEqual(actual, testValue);
		});
	});

	describe("When retrieving data from memory cache", () => {
		test("Then it should return the stored data", async () => {
			// Arrange
			await cache.set(testKey, testValue, memoryConfig);

			// Act
			const actual = await cache.get(testKey, memoryConfig);

			// Assert
			assert.deepStrictEqual(actual, testValue);
		});

		test("Then it should return undefined for expired data", async () => {
			// Arrange
			const expiredConfig = { ...memoryConfig, ttl: 1000 }; // 1 second TTL
			await cache.set(testKey, testValue, expiredConfig);

			// Wait for the cache to expire
			await new Promise((resolve) => setTimeout(resolve, 1100));

			// Act
			const actual = await cache.get(testKey, expiredConfig);

			// Assert
			assert.strictEqual(actual, undefined);
		});
	});

	describe("When saving data to file cache", () => {
		test("Then it should store the data in a file", async () => {
			// Arrange
			let actualPath: string | undefined;
			let actualData: CacheEntry<TestValue> | undefined;
			const writeJsonMock = mock.method(
				file,
				"writeJson",
				async (path: string, data: unknown) => {
					actualPath = path;
					actualData = data as CacheEntry<TestValue>;
				},
			);

			// Act
			await cache.set(testKey, testValue, fileConfig);

			// Assert
			assert.strictEqual(
				actualPath,
				`${fileConfig.directory}/${testKey}.cache.json`,
			);
			assert.deepStrictEqual(actualData, {
				key: testKey,
				value: testValue,
				timestamp: actualData?.timestamp,
			});

			// Cleanup
			mock.reset();
		});
	});

	describe("When retrieving data from file cache", () => {
		test("Then it should return the stored data", async () => {
			// Arrange
			const mockCacheEntry: CacheEntry<TestValue> = {
				key: testKey,
				value: testValue,
				timestamp: Date.now(),
			};
			const readJsonMock = mock.method(
				file,
				"readJson",
				async () => mockCacheEntry,
			);

			// Act
			const actual = await cache.get(testKey, fileConfig);

			// Assert
			assert.deepStrictEqual(actual, testValue);

			// Cleanup
			mock.reset();
		});

		test("Then it should return undefined for expired data", async () => {
			// Arrange
			const mockCacheEntry: CacheEntry<TestValue> = {
				key: testKey,
				value: testValue,
				timestamp: Date.now() - 1000 * 60 * 60 * 25, // 25 hours old
			};
			const readJsonMock = mock.method(
				file,
				"readJson",
				async () => mockCacheEntry,
			);

			// Act
			const actual = await cache.get(testKey, fileConfig);

			// Assert
			assert.strictEqual(actual, undefined);

			// Cleanup
			mock.reset();
		});
	});
});
