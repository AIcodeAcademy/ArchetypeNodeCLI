import assert from "node:assert";
import { describe, it, mock } from "node:test";
import { fsAdapter } from "../../src/system/fs.adapter.ts";
import { readJsonFile, writeJsonFile } from "../../src/system/json.utils.ts";

describe("JSON Utilities", () => {
	const mockReadFile = mock.method(fsAdapter, "readFile", async () => "{}");
	const mockWriteFile = mock.method(fsAdapter, "writeFile", async () => {});

	describe("readJsonFile", () => {
		it("should read and parse JSON file", async () => {
			const mockData = { key: "value" };
			mockReadFile.mock.mockImplementation(() =>
				Promise.resolve(JSON.stringify(mockData)),
			);

			const result = await readJsonFile<typeof mockData>("test.json");

			assert.deepStrictEqual(result, mockData);
			assert.strictEqual(mockReadFile.mock.calls[0].arguments[0], "test.json");
		});

		it("should handle invalid JSON data", async () => {
			mockReadFile.mock.mockImplementation(() =>
				Promise.resolve("invalid json"),
			);

			await assert.rejects(() => readJsonFile("test.json"), SyntaxError);
		});

		it("should propagate file system errors", async () => {
			const error = new Error("File not found");
			mockReadFile.mock.mockImplementation(() => Promise.reject(error));

			await assert.rejects(() => readJsonFile("nonexistent.json"), {
				message: "File not found",
			});
		});
	});

	describe("writeJsonFile", () => {
		it("should stringify and write JSON data", async () => {
			const data = { key: "value" };

			await writeJsonFile("test.json", data);

			assert.strictEqual(mockWriteFile.mock.calls[0].arguments[0], "test.json");
			assert.strictEqual(
				mockWriteFile.mock.calls[0].arguments[1],
				JSON.stringify(data),
			);
		});

		it("should handle circular references", async () => {
			interface CircularData {
				key: string;
				self?: CircularData;
			}
			const circularData: CircularData = { key: "value" };
			circularData.self = circularData;

			await assert.rejects(
				() => writeJsonFile("test.json", circularData),
				TypeError,
			);
		});

		it("should propagate file system errors", async () => {
			const error = new Error("Permission denied");
			mockWriteFile.mock.mockImplementation(() => Promise.reject(error));

			await assert.rejects(() => writeJsonFile("test.json", {}), {
				message: "Permission denied",
			});
		});
	});
});
