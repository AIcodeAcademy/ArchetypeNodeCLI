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
	plaintext: string,
	key: string,
	algorithm = "aes-256-gcm",
	encoding: BufferEncoding = "base64",
): string {
	const crypto_key = crypto
		.createHash("sha512")
		.update(key)
		.digest("hex")
		.substring(0, 32);
	const encryptionIV = crypto
		.createHash("sha512")
		.update("secret_iv")
		.digest("hex")
		.substring(0, 16);
}

function decrypt(
	ciphertext: string,
	key: string,
	iv: string,
	algorithm = "aes-256-gcm",
	encoding: BufferEncoding = "utf8",
): string {
	const decipher = crypto.createDecipheriv(
		algorithm,
		Buffer.from(key, "base64"),
		Buffer.from(iv, "base64"),
	);

	//decipher.setAuthTag(Buffer.from(tag, "base64"));

	let plaintext = decipher.update(ciphertext, "base64", encoding);
	plaintext += decipher.final(encoding);

	return plaintext;
}
