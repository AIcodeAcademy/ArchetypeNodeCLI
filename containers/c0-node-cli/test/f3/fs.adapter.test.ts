import assert from "node:assert";
import fs from "node:fs/promises";
import { beforeEach, describe, mock, test } from "node:test";
import { fsAdapter } from "../../src/system/fs.adapter.ts";

/**
 * Given fs.adapter
 * When readFile is called
 * Then it should read file content with UTF-8 encoding
 * When writeFile is called
 * Then it should write content to file
 * When appendLine is called
 * Then it should append line with newline character
 */
describe("Given fs.adapter", () => {
	const fsReadFileSpy = mock.method(fs, "readFile");
	const fsWriteFileSpy = mock.method(fs, "writeFile");
	const fsAppendFileSpy = mock.method(fs, "appendFile");

	beforeEach(() => {
		// Arrange
		fsReadFileSpy.mock.resetCalls();
		fsWriteFileSpy.mock.resetCalls();
		fsAppendFileSpy.mock.resetCalls();
	});

	describe("When readFile is called", () => {
		beforeEach(() => {
			// Arrange
			// biome-ignore lint/suspicious/noExplicitAny: just for mock
			fsReadFileSpy.mock.mockImplementation(async () => "test content" as any);
		});

		test("Then it should read file content with UTF-8 encoding", async () => {
			// Act
			const result = await fsAdapter.readFile("test.txt");

			// Assert
			assert.strictEqual(result, "test content");
			assert.strictEqual(fsReadFileSpy.mock.calls[0].arguments[0], "test.txt");
			assert.strictEqual(fsReadFileSpy.mock.calls[0].arguments[1], "utf-8");
		});
	});

	describe("When readFile is called with non-existent file", () => {
		beforeEach(() => {
			// Arrange
			const error = new Error("File not found");
			fsReadFileSpy.mock.mockImplementation(() => Promise.reject(error));
		});

		test("Then it should propagate file system errors", async () => {
			// Act & Assert
			await assert.rejects(() => fsAdapter.readFile("nonexistent.txt"), {
				message: "File not found",
			});
		});
	});

	describe("When writeFile is called", () => {
		test("Then it should write content to file", async () => {
			// Act
			await fsAdapter.writeFile("test.txt", "content");

			// Assert
			assert.strictEqual(fsWriteFileSpy.mock.calls[0].arguments[0], "test.txt");
			assert.strictEqual(fsWriteFileSpy.mock.calls[0].arguments[1], "content");
		});
	});

	describe("When appendLine is called", () => {
		test("Then it should append line with newline character", async () => {
			// Act
			await fsAdapter.appendLine("test.txt", "new line");

			// Assert
			assert.strictEqual(
				fsAppendFileSpy.mock.calls[0].arguments[0],
				"test.txt",
			);
			assert.strictEqual(
				fsAppendFileSpy.mock.calls[0].arguments[1],
				"new line\n",
			);
		});
	});
});
