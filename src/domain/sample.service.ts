import { insertSample } from "../system/sample.repository.ts";
import type { Sample } from "../system/sample.type.ts";
import { DEFAULT_SAMPLE } from "../system/sample.type.ts";
import { generateNumericId } from "./id.utils.ts";
import { validateName } from "./sample.validator.ts";

export { createSample };

async function createSample(name: string): Promise<Sample> {
	// Simulate saving the sample name to a database or file
	const sample: Sample = {
		...DEFAULT_SAMPLE,
		name,
	};
	if (!validateName(sample)) {
		throw new Error("Invalid sample name");
	}
	sample.id = generateNumericId();
	return insertSample(sample);
}
