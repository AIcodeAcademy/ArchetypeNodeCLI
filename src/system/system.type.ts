/**
 * @module system.type
 * @description Defines basic types used for system interactions.
 */

/**
 * Represents a path to a file.
 * Using a branded type to avoid accidental misuse of strings.
 */
export type FilePath = string & { readonly __brand: "FilePath" };

/**
 * Represents a path to a directory.
 * Using a branded type to avoid accidental misuse of strings.
 */
export type DirectoryPath = string & { readonly __brand: "DirectoryPath" };

// Add more system-level types as needed, e.g., URL, PortNumber, etc.
