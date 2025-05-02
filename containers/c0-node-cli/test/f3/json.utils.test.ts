import assert from "node:assert";
import { beforeEach, describe, mock, test } from "node:test";
import { fsAdapter } from "../../src/system/fs.adapter.ts";
import { jsonUtils } from "../../src/system/json.utils.ts";

/**
 * Given json.utils
 * When readJsonFile is called
 * Then it should read and parse JSON file
 * When writeJsonFile is called
 * Then it should stringify and write JSON data
 */
describe("Given json.utils", () => {
	const fsReadFileSpy = mock.method(fsAdapter, "readFile");
	const fsWriteFileSpy = mock.method(fsAdapter, "writeFile");

	beforeEach(() => {
		// Arrange
		fsReadFileSpy.mock.resetCalls();
		fsWriteFileSpy.mock.resetCalls();
	});

	describe("When readJsonFile is called with valid JSON", () => {
		beforeEach(() => {
			// Arrange
			const mockData = { key: "value" };
			fsReadFileSpy.mock.mockImplementation(() =>
				Promise.resolve(JSON.stringify(mockData)),
			);
		});

		test("Then it should read and parse JSON file", async () => {
			// Act
			const result = await jsonUtils.readFromFile<{ key: string }>("test.json");

			// Assert
			assert.deepStrictEqual(result, { key: "value" });
			assert.strictEqual(fsReadFileSpy.mock.calls[0].arguments[0], "test.json");
		});
	});

	describe("When readJsonFile is called with invalid JSON", () => {
		beforeEach(() => {
			// Arrange
			fsReadFileSpy.mock.mockImplementation(() =>
				Promise.resolve("invalid json"),
			);
		});

		test("Then it should throw SyntaxError", async () => {
			// Act & Assert
			await assert.rejects(
				() => jsonUtils.readFromFile("test.json"),
				SyntaxError,
			);
		});
	});

	describe("When readJsonFile is called with non-existent file", () => {
		beforeEach(() => {
			// Arrange
			const error = new Error("File not found");
			fsReadFileSpy.mock.mockImplementation(() => Promise.reject(error));
		});

		test("Then it should propagate file system errors", async () => {
			// Act & Assert
			await assert.rejects(() => jsonUtils.readFromFile("nonexistent.json"), {
				message: "File not found",
			});
		});
	});

	describe("When writeJsonFile is called with valid data", () => {
		test("Then it should stringify and write JSON data", async () => {
			// Arrange
			const data = { key: "value" };

			// Act
			await jsonUtils.writeToFile("test.json", data);

			// Assert
			assert.strictEqual(
				fsWriteFileSpy.mock.calls[0].arguments[0],
				"test.json",
			);
			assert.strictEqual(
				fsWriteFileSpy.mock.calls[0].arguments[1],
				JSON.stringify(data),
			);
		});
	});

	describe("When writeJsonFile is called with circular reference", () => {
		test("Then it should throw TypeError", async () => {
			// Arrange
			interface CircularData {
				key: string;
				self?: CircularData;
			}
			const circularData: CircularData = { key: "value" };
			circularData.self = circularData;

			// Act & Assert
			await assert.rejects(
				() => jsonUtils.writeToFile("test.json", circularData),
				TypeError,
			);
		});
	});

	describe("When writeJsonFile is called with permission error", () => {
		beforeEach(() => {
			// Arrange
			const error = new Error("Permission denied");
			fsWriteFileSpy.mock.mockImplementation(() => Promise.reject(error));
		});

		test("Then it should propagate file system errors", async () => {
			// Act & Assert
			await assert.rejects(() => jsonUtils.writeToFile("test.json", {}), {
				message: "Permission denied",
			});
		});
	});
});
