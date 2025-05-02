import assert from "node:assert";
import { beforeEach, describe, mock, test } from "node:test";
import { fsAdapter } from "../../src/system/fs.adapter.ts";
import { jsonUtils } from "../../src/system/json.utils.ts";

/**
 * Given jsonUtils
 * When readFromFile responds with valid JSON
 * Then it should read and parse JSON file
 * When readFromFile responds with invalid JSON
 * Then it should throw SyntaxError
 * When readFromFile responds with non-existent file
 * Then it should propagate file system errors
 * When writeToFile is called
 * Then it should stringify and write JSON data
 */
describe("Given json.utils", () => {
	const fsReadFileMock = mock.method(fsAdapter, "readFile");
	const fsWriteFileMock = mock.method(fsAdapter, "writeFile");
	const fsMakeDirMock = mock.method(fsAdapter, "makeDir");
	type TestType = { key: string };
	const mockData: TestType = {
		key: "value",
	};
	beforeEach(() => {
		// Arrange
		fsReadFileMock.mock.resetCalls();
		fsWriteFileMock.mock.resetCalls();
	});
	describe("When readFromFile responds with valid JSON", () => {
		beforeEach(() => {
			// Arrange
			fsReadFileMock.mock.mockImplementation(() =>
				Promise.resolve(JSON.stringify(mockData)),
			);
		});
		test("Then it should read and parse JSON file", async () => {
			// Act
			const result = await jsonUtils.readFromFile<TestType>("test.json");
			// Assert
			assert.deepStrictEqual(result, mockData);
			assert.strictEqual(
				fsReadFileMock.mock.calls[0].arguments[0],
				"test.json",
			);
		});
	});

	describe("When readFromFile responds with invalid JSON", () => {
		beforeEach(() => {
			// Arrange
			fsReadFileMock.mock.mockImplementation(() =>
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

	describe("When readFromFile responds with non-existent file", () => {
		beforeEach(() => {
			// Arrange
			const error = new Error("File not found");
			fsReadFileMock.mock.mockImplementation(() => Promise.reject(error));
		});

		test("Then it should propagate file system errors", async () => {
			// Act & Assert
			await assert.rejects(() => jsonUtils.readFromFile("nonexistent.json"), {
				message: "File not found",
			});
		});
	});

	describe("When writeToFile is called with valid data", () => {
		test("Then it should stringify and write JSON data", async () => {
			// Arrange
			fsWriteFileMock.mock.mockImplementation(() => Promise.resolve());
			fsMakeDirMock.mock.resetCalls();
			// Act
			await jsonUtils.writeToFile("test.json", mockData);

			// Assert
			assert.strictEqual(
				fsWriteFileMock.mock.calls[0].arguments[0],
				"test.json",
			);
			assert.strictEqual(
				fsWriteFileMock.mock.calls[0].arguments[1],
				JSON.stringify(mockData),
			);
			assert.strictEqual(fsMakeDirMock.mock.calls[0].arguments[0], "test.json");
		});
	});
});
