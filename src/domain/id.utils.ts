/**
 * Utility functions for generating and validating IDs.
 */
export { generateNumericId, generateSlugId, generateTimestampId };

/**
 * Generates a unique ID based on the current timestamp and a random component.
 * @returns A unique ID based on the current timestamp and a random component.
 */
function generateTimestampId(): string {
	const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
	const randomPart = Math.random().toString(36).substring(2, 8); // Generate a random part
	return `${timestamp}-${randomPart}`; // Combine both parts
}

/**
 * Generates a slug ID from a given source string.
 * @param source - The source string to be converted into a slug ID.
 * @returns The generated slug ID.
 */
function generateSlugId(source: string): string {
	const slug = source
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
		.replace(/^-|-$/g, ""); // Remove leading and trailing hyphens
	return slug;
}

/**
 * Generates a unique numeric ID based on the current timestamp and a random component.
 * @returns A unique numeric ID based on the current timestamp and a random component.
 */
function generateNumericId(): number {
	const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
	const randomPart = Math.random().toString(36).substring(2, 8); // Generate a random part
	const numericId = parseInt(timestamp + randomPart, 36); // Convert the combined string to a number
	return numericId; // Return the numeric ID
}
