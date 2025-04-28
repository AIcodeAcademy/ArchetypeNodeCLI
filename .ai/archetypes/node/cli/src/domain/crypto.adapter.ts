import crypto, { type BinaryToTextEncoding, randomUUID } from "node:crypto";

// Adapts the Node.js crypto module to a more generic interface

const ALGORITHM = "sha256";
const ENCODING = "hex";

export function generateRandomUuid(): string {
	return randomUUID();
}

export function hashText(
	text: string,
	algorithm: string = ALGORITHM,
	encoding: BinaryToTextEncoding = ENCODING,
): string {
	return crypto.createHash(algorithm).update(text).digest(encoding);
}

export function randomBytesString(
	length: number,
	encoding: BinaryToTextEncoding = ENCODING,
): string {
	return crypto.randomBytes(length).toString(encoding);
}

export function randomBytes(length: number): Buffer {
	return crypto.randomBytes(length);
}

export function encryptHmac(
	data: string,
	key: string,
	algorithm: string = ALGORITHM,
	encoding: BinaryToTextEncoding = ENCODING,
): string {
	return crypto.createHmac(algorithm, key).update(data).digest(encoding);
}

export function decryptHmac(
	data: string,
	key: string,
	algorithm: string = ALGORITHM,
	encoding: BinaryToTextEncoding = ENCODING,
): string {
	return crypto.createHmac(algorithm, key).update(data).digest(encoding);
}
