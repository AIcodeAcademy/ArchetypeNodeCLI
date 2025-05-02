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
	encrypt: encrypt,
	decrypt: decrypt,
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

// ToDo: Implement encryption and decryption

function encrypt(
	plainText: string,
	key: string,
	algorithm = "aes-256-gcm",
	encoding: BufferEncoding = "base64",
): string {
	return plainText;
}

function decrypt(
	cipherText: string,
	key: string,
	algorithm = "aes-256-gcm",
	encoding: BufferEncoding = "utf8",
): string {
	return cipherText;
}
