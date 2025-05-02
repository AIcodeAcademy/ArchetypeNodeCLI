import { strict as assert } from "node:assert";
import { describe, test } from "node:test";
import { idUtils } from "../../src/domain/id.utils.ts";

/**
 * @feature ID Generation Utilities
 * @description Tests for various ID generation functions
 *
 * @scenario Generate UUID
 * Given a UUID generation function
 * When the function is called
 * Then it should return a valid UUID string
 *
 * @scenario Generate Number ID
 * Given a number ID generation function
 * When the function is called with min and max values
 * Then it should return a number within the specified range
 *
 * @scenario Generate String ID
 * Given a string ID generation function
 * When the function is called with a specific length
 * Then it should return a string of the specified length with valid characters
 *
 * @scenario Generate Timestamp ID
 * Given a timestamp ID generation function
 * When the function is called
 * Then it should return a valid ISO string
 *
 * @scenario Generate Timestamp Number ID
 * Given a timestamp number ID generation function
 * When the function is called
 * Then it should return a valid timestamp number
 */
describe("ID Generation Utilities", () => {
	describe("UUID Generation", () => {
		test("should generate a valid UUID", () => {
			// Arrange
			const uuidRegex =
				/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

			// Act
			const uuid = idUtils.generateUuid();

			// Assert
			assert.match(uuid, uuidRegex);
		});
	});

	describe("Number ID Generation", () => {
		test("should generate a number within default range", () => {
			// Arrange
			const min = 0;
			const max = 1000000;

			// Act
			const id = idUtils.generateNumberId();

			// Assert
			assert.ok(id >= min && id <= max);
		});

		test("should generate a number within custom range", () => {
			// Arrange
			const min = 10;
			const max = 20;

			// Act
			const id = idUtils.generateNumberId(min, max);

			// Assert
			assert.ok(id >= min && id <= max);
		});
	});

	describe("String ID Generation", () => {
		test("should generate a string of default length", () => {
			// Arrange
			const defaultLength = 10;

			// Act
			const id = idUtils.generateStringId();

			// Assert
			assert.strictEqual(id.length, defaultLength);
			assert.match(id, /^[0-9a-z]+$/);
		});

		test("should generate a string of custom length", () => {
			// Arrange
			const customLength = 15;

			// Act
			const id = idUtils.generateStringId(customLength);

			// Assert
			assert.strictEqual(id.length, customLength);
			assert.match(id, /^[0-9a-z]+$/);
		});
	});

	describe("Timestamp ID Generation", () => {
		test("should generate a valid ISO timestamp", () => {
			// Arrange
			const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

			// Act
			const timestamp = idUtils.generateTimestampId();

			// Assert
			assert.match(timestamp, isoRegex);
		});
	});

	describe("Timestamp Number ID Generation", () => {
		test("should generate a valid timestamp number", () => {
			// Arrange
			const now = Date.now();

			// Act
			const timestamp = idUtils.generateTimestampNumberId();

			// Assert
			assert.ok(timestamp >= now);
			assert.ok(timestamp <= Date.now());
		});
	});
});
