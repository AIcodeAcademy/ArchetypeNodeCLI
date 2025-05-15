import assert from "node:assert";
import fs from "node:fs/promises";
import { join } from "node:path";
import { afterEach, beforeEach, describe, test } from "node:test";
import { directory } from "../../app/shared/file/directory.adapter.ts";
import { file } from "../../app/shared/file/file.adapter.ts";

/**
 * Given a file adapter
 *  When reading a file
 *   Then it should return the file content
 *  When writing to a file
 *   Then it should create the file with content
 *  When deleting a file
 *   Then it should remove the file
 *  When checking if a file exists
 *   Then it should return true for existing files
 *   Then it should return false for non-existent files
 */
describe("Given a file adapter", () => {
	const testDir = join(process.cwd(), "test-temp");
	const testFile = join(testDir, "test.txt");
	const testContent = "test content";

	beforeEach(async () => {
		await fs.mkdir(testDir, { recursive: true });
	});

	afterEach(async () => {
		try {
			await fs.rm(testDir, { recursive: true, force: true });
		} catch (error) {
			// Ignore cleanup errors
		}
	});

	describe("When reading a file", () => {
		test("Then it should return the file content", async () => {
			// Arrange
			await fs.writeFile(testFile, testContent);

			// Act
			const actual = await file.read(testFile);

			// Assert
			assert.strictEqual(actual, testContent);
		});
	});

	describe("When writing to a file", () => {
		test("Then it should create the file with content", async () => {
			// Arrange
			// Act
			await file.write(testFile, testContent);

			// Assert
			const actual = await fs.readFile(testFile, "utf-8");
			assert.strictEqual(actual, testContent);
		});
	});

	describe("When deleting a file", () => {
		test("Then it should remove the file", async () => {
			// Arrange
			await fs.writeFile(testFile, testContent);

			// Act
			await file.delete(testFile);

			// Assert
			const exists = await file.exists(testFile);
			assert.strictEqual(exists, false);
		});
	});

	describe("When checking if a file exists", () => {
		test("Then it should return true for existing files", async () => {
			// Arrange
			await fs.writeFile(testFile, testContent);

			// Act
			const actual = await file.exists(testFile);

			// Assert
			assert.strictEqual(actual, true);
		});

		test("Then it should return false for non-existent files", async () => {
			// Arrange
			// Act
			const actual = await file.exists(testFile);

			// Assert
			assert.strictEqual(actual, false);
		});
	});
});

/**
 * Given a directory adapter
 *  When creating a directory
 *   Then it should create the directory if it doesn't exist
 *  When getting directory name from path
 *   Then it should return the parent directory path
 *  When reading a directory
 *   Then it should return list of files in the directory
 */
describe("Given a directory adapter", () => {
	const testDir = join(process.cwd(), "test-temp");
	const testFile = join(testDir, "test.txt");

	beforeEach(async () => {
		await fs.mkdir(testDir, { recursive: true });
	});

	afterEach(async () => {
		try {
			await fs.rm(testDir, { recursive: true, force: true });
		} catch (error) {
			// Ignore cleanup errors
		}
	});

	describe("When creating a directory", () => {
		test("Then it should create the directory if it doesn't exist", async () => {
			// Arrange
			const newDir = join(testDir, "new-dir", "sub-dir");
			const parentDir = await directory.getName(newDir);

			// Act
			await directory.make(newDir);

			// Assert
			const exists = await directory.exists(parentDir);
			assert.strictEqual(exists, true);
		});
	});

	describe("When getting directory name from path", () => {
		test("Then it should return the parent directory path", async () => {
			// Arrange
			const expected = testDir;

			// Act
			const actual = await directory.getName(testFile);

			// Assert
			assert.strictEqual(actual, expected);
		});
	});

	describe("When reading a directory", () => {
		test("Then it should return list of files in the directory", async () => {
			// Arrange
			const file1 = join(testDir, "file1.txt");
			const file2 = join(testDir, "file2.txt");
			await fs.writeFile(file1, "test");
			await fs.writeFile(file2, "test");

			// Act
			const actual = await directory.read(testDir);

			// Assert
			assert.deepStrictEqual(actual.sort(), ["file1.txt", "file2.txt"].sort());
		});
	});
});
