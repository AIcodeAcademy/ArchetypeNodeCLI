import crypto, { type BinaryToTextEncoding, randomUUID } from "node:crypto";

export function generateRandomUuid(): string {
	return randomUUID();
}

export function hashText(
	text: string,
	algorithm: string,
	encoding: BinaryToTextEncoding,
): string {
	return crypto.createHash(algorithm).update(text).digest(encoding);
}

export function randomBytesString(
	length: number,
	encoding: BinaryToTextEncoding,
): string {
	return crypto.randomBytes(length).toString(encoding);
}

export function randomBytes(length: number): Buffer {
	return crypto.randomBytes(length);
}

export function encryptHmac(
	data: string,
	key: string,
	algorithm: string,
	encoding: BinaryToTextEncoding,
): string {
	return crypto.createHmac(algorithm, key).update(data).digest(encoding);
}

export function decryptHmac(
	data: string,
	key: string,
	algorithm: string,
	encoding: BinaryToTextEncoding,
): string {
	return crypto.createHmac(algorithm, key).update(data).digest(encoding);
}
