// id generation utilities

import { randomUUID } from "node:crypto";

export function generateUuid(): string {
	return randomUUID();
}

export function generateNumberId(min = 0, max = 1000000): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateId(length = 10): string {
	const characters = "0123456789abcdefghijklmnopqrstuvwxyz";
	let result = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters[randomIndex];
	}
	return result;
}

export function generateTimestampId(): string {
	return new Date().toISOString();
}

export function generateTimestampNumberId(): number {
	return Date.now();
}
