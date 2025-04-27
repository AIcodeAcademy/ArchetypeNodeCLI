import { generateRandomUuid } from "./crypto.adapter.ts";

const CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyz";
const ID_LENGTH = 10;
const ID_MIN = 0;
const ID_MAX = 1000000;
export const generateUuid = generateRandomUuid;

export function generateNumberId(min = ID_MIN, max = ID_MAX): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateStringId(length = ID_LENGTH): string {
	let result = "";
	for (let i = 0; i < length; i++) {
		const randomCharacter = Math.random() * CHARACTERS.length;
		const randomIndex = Math.floor(randomCharacter);
		result += CHARACTERS[randomIndex];
	}
	return result;
}

export function generateTimestampId(): string {
	return new Date().toISOString();
}

export function generateTimestampNumberId(): number {
	return Date.now();
}
