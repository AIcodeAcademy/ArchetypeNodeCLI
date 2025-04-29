import crypto, { type BinaryToTextEncoding, randomUUID } from "node:crypto";

const ALGORITHM = "sha256";
const ENCODING = "hex";

/**
 * Crypto adapter
 *
 * @description Adapts the Node.js crypto module to a more generic interface
 * @example
 * const uuid = cryptoAdapter.randomUUID();
 * const hash = cryptoAdapter.hashText("Hello, world!");
 * const randomBytesString = cryptoAdapter.randomBytesString(16);
 */
export const cryptoAdapter = {
	randomUUID: randomUUID,
	hashText: hashText,
	randomBytesString: randomBytesString,
	randomBytes: randomBytes,
	encryptHmac: encryptHmac,
	decryptHmac: decryptHmac,
};

function hashText(
	text: string,
	algorithm: string = ALGORITHM,
	encoding: BinaryToTextEncoding = ENCODING,
): string {
	return crypto.createHash(algorithm).update(text).digest(encoding);
}

function randomBytesString(
	length: number,
	encoding: BinaryToTextEncoding = ENCODING,
): string {
	return crypto.randomBytes(length).toString(encoding);
}

function randomBytes(length: number): Buffer {
	return crypto.randomBytes(length);
}

function encryptHmac(
	data: string,
	key: string,
	algorithm: string = ALGORITHM,
	encoding: BinaryToTextEncoding = ENCODING,
): string {
	return crypto.createHmac(algorithm, key).update(data).digest(encoding);
}

function decryptHmac(
	data: string,
	key: string,
	algorithm: string = ALGORITHM,
	encoding: BinaryToTextEncoding = ENCODING,
): string {
	return crypto.createHmac(algorithm, key).update(data).digest(encoding);
}
