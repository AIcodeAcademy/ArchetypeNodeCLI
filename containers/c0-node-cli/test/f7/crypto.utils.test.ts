import { strict as assert } from "node:assert";
import { describe, test } from "node:test";
import {
	decrypt,
	encrypt,
	generateToken,
	hashPassword,
	validatePassword,
} from "../../src/domain/crypto.utils.ts";

/**
 * @feature Crypto Utilities
 * @description Tests for cryptographic utility functions
 *
 * @scenario Password Hashing
 * Given a password hashing function
 * When a password is hashed
 * Then it should return a consistent hash for the same password
 *
 * @scenario Password Validation
 * Given a password validation function
 * When a password is validated against its hash
 * Then it should return true for correct password and false for incorrect
 *
 * @scenario Token Generation
 * Given a token generation function
 * When a token is generated
 * Then it should return a string of the specified length
 *
 * @scenario Encryption and Decryption
 * Given encryption and decryption functions
 * When data is encrypted and then decrypted with the same key
 * Then the decrypted data should match the original
 */
describe("Crypto Utilities", () => {
	describe("Password Hashing", () => {
		test("should generate consistent hash for same password", () => {
			// Arrange
			const password = "testPassword123";

			// Act
			const hash1 = hashPassword(password);
			const hash2 = hashPassword(password);

			// Assert
			assert.strictEqual(hash1, hash2);
		});

		test("should generate different hashes for different passwords", () => {
			// Arrange
			const password1 = "testPassword123";
			const password2 = "testPassword124";

			// Act
			const hash1 = hashPassword(password1);
			const hash2 = hashPassword(password2);

			// Assert
			assert.notStrictEqual(hash1, hash2);
		});
	});

	describe("Password Validation", () => {
		test("should validate correct password", () => {
			// Arrange
			const password = "testPassword123";
			const hash = hashPassword(password);

			// Act
			const isValid = validatePassword(password, hash);

			// Assert
			assert.strictEqual(isValid, true);
		});

		test("should reject incorrect password", () => {
			// Arrange
			const password = "testPassword123";
			const wrongPassword = "testPassword124";
			const hash = hashPassword(password);

			// Act
			const isValid = validatePassword(wrongPassword, hash);

			// Assert
			assert.strictEqual(isValid, false);
		});
	});

	describe("Token Generation", () => {
		test("should generate token of default length", () => {
			// Arrange
			const expectedLength = 16;

			// Act
			const token = generateToken();

			// Assert
			assert.strictEqual(token.length, expectedLength);
		});

		test("should generate token of custom length", () => {
			// Arrange
			const length = 16;
			const expectedLength = length * 2; // hex encoding doubles the length

			// Act
			const token = generateToken(length);

			// Assert
			assert.strictEqual(token.length, expectedLength);
		});
	});

	describe("Encryption and Decryption", () => {
		test("should encrypt and decrypt data correctly", () => {
			// Arrange
			const data = "test data";
			const key = "test key";

			// Act
			const encrypted = encrypt(data, key);
			const decrypted = decrypt(encrypted, key);

			// Assert
			assert.strictEqual(decrypted, data);
		});

		test("should not decrypt with wrong key", () => {
			// Arrange
			const data = "test data";
			const key = "test key";
			const wrongKey = "wrong key";

			// Act
			const encrypted = encrypt(data, key);
			const decrypted = decrypt(encrypted, wrongKey);

			// Assert
			assert.notStrictEqual(decrypted, data);
		});
	});
});
