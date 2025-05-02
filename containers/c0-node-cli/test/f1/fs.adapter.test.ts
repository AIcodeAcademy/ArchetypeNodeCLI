import assert from "node:assert";
import fs from "node:fs/promises";
import { afterEach, beforeEach, describe, test } from "node:test";
import { fsAdapter } from "../../src/system/fs.adapter.ts";

/**
 * Given fsAdapter
 * When readFile is called
 * Then it should read file content with UTF-8 encoding
 * When writeFile is called
 * Then it should write content to file
 * When appendLine is called
 * Then it should append line with newline character
 * When deleteFile is called
 * Then it should delete file
 */
describe("Given fsAdapter", () => {
	const TEST_FILE = "./test/test.txt";
	describe("When readFile is called", () => {
		beforeEach(() => {
			// Arrange
			fs.writeFile(TEST_FILE, "test content");
		});
		test("Then it should read file content with UTF-8 encoding", async () => {
			// Act
			const result = await fsAdapter.readFile(TEST_FILE);
			// Assert
			assert.strictEqual(result, "test content");
		});
		afterEach(() => {
			fs.unlink(TEST_FILE);
		});
	});
	describe("When writeFile is called", () => {
		test("Then it should write content to file", async () => {
			// Act
			await fsAdapter.writeFile(TEST_FILE, "test content");
			// Assert
			const result = await fs.readFile(TEST_FILE, "utf-8");
			assert.strictEqual(result, "test content");
		});
		afterEach(() => {
			fs.unlink(TEST_FILE);
		});
	});
	describe("When appendLine is called", () => {
		test("Then it should append line with newline character", async () => {
			// Act
			await fsAdapter.appendLine(TEST_FILE, "test line");
			// Assert
			const result = await fs.readFile(TEST_FILE, "utf-8");
			assert.strictEqual(result, "test line\n");
		});
		afterEach(() => {
			fs.unlink(TEST_FILE);
		});
	});
});
