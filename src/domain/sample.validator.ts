import type { Sample } from "../system/sample.type.ts";

/**
 * Validation function for the Sample entity.
 */
export { validateName };

function validateName(sample: Sample): boolean {
	// Check if the name is a non-empty string
	const name = sample.name;
	return typeof name === "string" && name.trim() !== "";
}
