/**
 * Sample Type
 * Represents a sample with an ID and a name.
 */
export type Sample = {
	id: number;
	name: string;
	description?: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
};

export const DEFAULT_SAMPLE: Sample = {
	id: 0,
	name: "",
} as const;
