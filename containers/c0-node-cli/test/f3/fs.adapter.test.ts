import assert from "node:assert";
import type { PathLike } from "node:fs";
import fs from "node:fs/promises";
import { describe, it, mock } from "node:test";
import { fsAdapter } from "../../src/system/fs.adapter.ts";

describe("fsAdapter", () => {
	const mockFs = mock.method(
		fs,
		"readFile",
		async (_path: PathLike, _encoding?: BufferEncoding) => "test content",
	);
	const mockWriteFile = mock.method(fs, "writeFile", async () => {});
	const mockAppendFile = mock.method(fs, "appendFile", async () => {});

	describe("readFile", () => {
		it("should read file content with UTF-8 encoding", async () => {
			const result = await fsAdapter.readFile("test.txt");

			assert.strictEqual(result, "test content");
			assert.strictEqual(mockFs.mock.calls[0].arguments[0], "test.txt");
			assert.strictEqual(mockFs.mock.calls[0].arguments[1], "utf-8");
		});

		it("should propagate file system errors", async () => {
			const error = new Error("File not found");
			mockFs.mock.mockImplementation(() => Promise.reject(error));

			await assert.rejects(() => fsAdapter.readFile("nonexistent.txt"), {
				message: "File not found",
			});
		});
	});

	describe("writeFile", () => {
		it("should write content to file", async () => {
			await fsAdapter.writeFile("test.txt", "content");

			assert.strictEqual(mockWriteFile.mock.calls[0].arguments[0], "test.txt");
			assert.strictEqual(mockWriteFile.mock.calls[0].arguments[1], "content");
		});

		it("should propagate write errors", async () => {
			const error = new Error("Permission denied");
			mockWriteFile.mock.mockImplementation(() => Promise.reject(error));

			await assert.rejects(() => fsAdapter.writeFile("test.txt", "content"), {
				message: "Permission denied",
			});
		});
	});

	describe("appendLine", () => {
		it("should append line with newline character", async () => {
			await fsAdapter.appendLine("test.txt", "new line");

			assert.strictEqual(mockAppendFile.mock.calls[0].arguments[0], "test.txt");
			assert.strictEqual(
				mockAppendFile.mock.calls[0].arguments[1],
				"new line\n",
			);
		});

		it("should propagate append errors", async () => {
			const error = new Error("Disk full");
			mockAppendFile.mock.mockImplementation(() => Promise.reject(error));

			await assert.rejects(() => fsAdapter.appendLine("test.txt", "new line"), {
				message: "Disk full",
			});
		});
	});
});
