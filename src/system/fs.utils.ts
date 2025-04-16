/**
 * Filesystem access utility with promise-based operations and helpers
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Error thrown when there is an issue with filesystem operations
 */
export type FileSystemError = {
	type: "FILESYSTEM_ERROR";
	message: string;
	path?: string;
	cause?: unknown;
};

/**
 * Creates a filesystem error
 */
export const createFileSystemError = (
	message: string,
	filePath?: string,
	cause?: unknown,
): FileSystemError => ({
	type: "FILESYSTEM_ERROR",
	message,
	path: filePath,
	cause,
});

/**
 * Checks if a result is a FileSystemError
 */
export const isFileSystemError = (result: unknown): result is FileSystemError =>
	typeof result === "object" &&
	result !== null &&
	"type" in result &&
	result.type === "FILESYSTEM_ERROR";

/**
 * Gets the directory name of the current module
 */
export const getDirname = (importMetaUrl: string): string => {
	return path.dirname(fileURLToPath(importMetaUrl));
};

/**
 * Normalizes a file path based on the operating system
 */
export const normalizePath = (filePath: string): string => {
	return path.normalize(filePath).replace(/\\+/g, "/");
};

/**
 * Resolves path segments into an absolute path
 */
export const resolvePath = (...segments: string[]): string => {
	return normalizePath(path.resolve(...segments));
};

/**
 * Reads file content as text
 */
export const readTextFile = async (
	filePath: string,
): Promise<string | FileSystemError> => {
	try {
		return await fs.readFile(filePath, { encoding: "utf-8" });
	} catch (error) {
		return createFileSystemError(
			`Failed to read file: ${(error as Error).message}`,
			filePath,
			error,
		);
	}
};

/**
 * Reads file content as JSON with type safety
 */
export const readJsonFile = async <T>(
	filePath: string,
): Promise<T | FileSystemError> => {
	const content = await readTextFile(filePath);

	if (isFileSystemError(content)) {
		return content;
	}

	try {
		return JSON.parse(content) as T;
	} catch (error) {
		return createFileSystemError(
			`Failed to parse JSON: ${(error as Error).message}`,
			filePath,
			error,
		);
	}
};

/**
 * Writes text content to a file
 */
export const writeTextFile = async (
	filePath: string,
	content: string,
): Promise<undefined | FileSystemError> => {
	try {
		const dirPath = path.dirname(filePath);
		await ensureDirectoryExists(dirPath);
		await fs.writeFile(filePath, content, { encoding: "utf-8" });
		return undefined;
	} catch (error) {
		return createFileSystemError(
			`Failed to write file: ${(error as Error).message}`,
			filePath,
			error,
		);
	}
};

/**
 * Writes data as JSON to a file
 */
export const writeJsonFile = async <T>(
	filePath: string,
	data: T,
): Promise<undefined | FileSystemError> => {
	try {
		const jsonContent = JSON.stringify(data, null, 2);
		return writeTextFile(filePath, jsonContent);
	} catch (error) {
		return createFileSystemError(
			`Failed to stringify JSON: ${(error as Error).message}`,
			filePath,
			error,
		);
	}
};

/**
 * Checks if a file exists
 */
export const fileExists = async (filePath: string): Promise<boolean> => {
	try {
		const stats = await fs.stat(filePath);
		return stats.isFile();
	} catch {
		return false;
	}
};

/**
 * Checks if a directory exists
 */
export const directoryExists = async (dirPath: string): Promise<boolean> => {
	try {
		const stats = await fs.stat(dirPath);
		return stats.isDirectory();
	} catch {
		return false;
	}
};

/**
 * Ensures a directory exists, creating it if necessary
 */
export const ensureDirectoryExists = async (
	dirPath: string,
): Promise<undefined | FileSystemError> => {
	try {
		await fs.mkdir(dirPath, { recursive: true });
		return undefined;
	} catch (error) {
		return createFileSystemError(
			`Failed to create directory: ${(error as Error).message}`,
			dirPath,
			error,
		);
	}
};

/**
 * Lists all files in a directory with optional filtering
 */
export const listFiles = async (
	dirPath: string,
	options?: {
		pattern?: RegExp;
		recursive?: boolean;
	},
): Promise<string[] | FileSystemError> => {
	try {
		const entries = await fs.readdir(dirPath, { withFileTypes: true });
		const files: string[] = [];

		for (const entry of entries) {
			const fullPath = path.join(dirPath, entry.name);

			if (entry.isFile()) {
				if (!options?.pattern || options.pattern.test(entry.name)) {
					files.push(fullPath);
				}
			} else if (entry.isDirectory() && options?.recursive) {
				const subDirFiles = await listFiles(fullPath, options);
				if (isFileSystemError(subDirFiles)) {
					return subDirFiles;
				}
				files.push(...subDirFiles);
			}
		}

		return files;
	} catch (error) {
		return createFileSystemError(
			`Failed to list files: ${(error as Error).message}`,
			dirPath,
			error,
		);
	}
};
