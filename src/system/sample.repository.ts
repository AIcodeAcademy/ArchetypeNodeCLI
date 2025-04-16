import type { Sample } from "./sample.type.ts";

/**
 * Sample repository for managing sample data.
 */
export { insert as insertSample, remove, selectAll, selectById, update };

async function selectAll(): Promise<Sample[]> {
	// Simulate fetching all samples from a database or an API
	return [
		{ id: 1, name: "Sample 1" },
		{ id: 2, name: "Sample 2" },
	];
}

async function selectById(id: number): Promise<Sample | null> {
	// Simulate fetching a sample by ID from a database or an API
	const samples = await selectAll();
	return samples.find((sample) => sample.id === id) || null;
}

async function insert(newSample: Sample): Promise<Sample> {
	// Simulate inserting a new sample into a database or an API
	newSample.createdAt = new Date();
	return newSample;
}

async function update(sample: Sample): Promise<Sample> {
	// Simulate updating a sample in a database or an API
	sample.updatedAt = new Date();
	return sample;
}

async function remove(id: number): Promise<void> {
	// Simulate removing a sample from a database or an API
	const sample = await selectById(id);
	if (!sample) return;
	sample.deletedAt = new Date();
	// Optionally, you can also remove the sample from the array or database here
	return;
}
