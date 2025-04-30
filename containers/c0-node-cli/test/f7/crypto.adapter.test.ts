import assert from "node:assert";
import { describe, test } from "node:test";
import { cryptoAdapter } from "../../src/domain/crypto.adapter.ts";

/**
 * @feature Crypto Adapter
 * @description Tests for cryptographic adapter functions
 *
 * @scenario UUID Generation
 * Given a UUID generation function
 * When the function is called
 * Then it should return a valid UUID string
 *
 * @scenario Text Hashing
 * Given a text hashing function
 * When text is hashed
 * Then it should return a consistent hash for the same input
 * Then it should return different hashes for different inputs
 *
 * @scenario Random Bytes
 * Given a random bytes generation function
 * When random bytes are generated
 * Then it should return a buffer of the specified length
 *
 * @scenario Random Bytes String
 * Given a random bytes string generation function
 * When a random string is generated
 * Then it should return a string of the specified length
 *
 * @scenario HMAC Encryption/Decryption
 * Given HMAC encryption and decryption functions
 * When data is encrypted and then decrypted with the same key
 * Then the decrypted data should match the original
 */
describe("Crypto Adapter", () => {
	describe("UUID Generation", () => {
		test("should generate a valid UUID", () => {
			// Arrange
			const uuidRegex =
				/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

			// Act
			const uuid = cryptoAdapter.randomUUID();

			// Assert
			assert.match(uuid, uuidRegex);
		});
	});

	describe("Text Hashing", () => {
		test("should generate consistent hash for same input", () => {
			// Arrange
			const text = "test text";

			// Act
			const hash1 = cryptoAdapter.hashText(text);
			const hash2 = cryptoAdapter.hashText(text);

			// Assert
			assert.strictEqual(hash1, hash2);
		});

		test("should generate different hashes for different inputs", () => {
			// Arrange
			const text1 = "test text 1";
			const text2 = "test text 2";

			// Act
			const hash1 = cryptoAdapter.hashText(text1);
			const hash2 = cryptoAdapter.hashText(text2);

			// Assert
			assert.notStrictEqual(hash1, hash2);
		});

		test("should accept custom algorithm and encoding", () => {
			// Arrange
			const text = "test text";
			const algorithm = "sha512";
			const encoding = "base64";

			// Act
			const hash = cryptoAdapter.hashText(text, algorithm, encoding);

			// Assert
			assert.ok(hash.length > 0);
			assert.match(hash, /^[A-Za-z0-9+/]+={0,2}$/);
		});
	});

	describe("Random Bytes", () => {
		test("should generate buffer of specified length", () => {
			// Arrange
			const length = 16;

			// Act
			const buffer = cryptoAdapter.randomBytes(length);

			// Assert
			assert.strictEqual(buffer.length, length);
		});

		test("should generate different buffers each time", () => {
			// Arrange
			const length = 16;

			// Act
			const buffer1 = cryptoAdapter.randomBytes(length);
			const buffer2 = cryptoAdapter.randomBytes(length);

			// Assert
			assert.notDeepStrictEqual(buffer1, buffer2);
		});
	});

	describe("Random Bytes String", () => {
		test("should generate string of specified length", () => {
			// Arrange
			const length = 16;

			// Act
			const str = cryptoAdapter.randomBytesString(length);

			// Assert
			assert.strictEqual(str.length, length * 2); // hex encoding doubles the length
		});

		test("should accept custom encoding", () => {
			// Arrange
			const length = 16;
			const encoding = "base64";

			// Act
			const str = cryptoAdapter.randomBytesString(length, encoding);

			// Assert
			assert.ok(str.length > 0);
			assert.match(str, /^[A-Za-z0-9+/]+={0,2}$/);
		});
	});

	describe("HMAC Encryption/Decryption", () => {
		test("should encrypt and decrypt data correctly", () => {
			// Arrange
			const data = "test data";
			const key = "test key";

			// Act
			const encrypted = cryptoAdapter.encrypt(data, key);
			const decrypted = cryptoAdapter.decrypt(encrypted, key);

			// Assert
			assert.strictEqual(decrypted, data);
		});

		test("should not decrypt with wrong key", () => {
			// Arrange
			const data = "test data";
			const key = "test key";
			const wrongKey = "wrong key";

			// Act
			const encrypted = cryptoAdapter.encrypt(data, key);
			const decrypted = cryptoAdapter.decrypt(encrypted, wrongKey);

			// Assert
			assert.notStrictEqual(decrypted, data);
		});

		test("should accept custom algorithm and encoding", () => {
			// Arrange
			const data = "test data";
			const key = "test key";
			const algorithm = "sha512";
			const encoding = "base64";

			// Act
			const encrypted = cryptoAdapter.encrypt(data, key, algorithm, encoding);
			const decrypted = cryptoAdapter.decrypt(
				encrypted,
				key,
				algorithm,
				encoding,
			);

			// Assert
			assert.strictEqual(decrypted, data);
			assert.match(encrypted, /^[A-Za-z0-9+/]+={0,2}$/);
		});
	});
});
