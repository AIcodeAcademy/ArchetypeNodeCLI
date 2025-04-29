import { cryptoAdapter } from "./crypto.adapter.ts";

const TOKEN_LENGTH = 32;

export function hashPassword(password: string): string {
	return cryptoAdapter.hashText(password);
}

export function validatePassword(password: string, hash: string): boolean {
	return hashPassword(password) === hash;
}

export function generateToken(length = TOKEN_LENGTH): string {
	return cryptoAdapter.randomBytesString(length);
}

export function encrypt(data: string, key: string): string {
	return cryptoAdapter.encryptHmac(data, key);
}

export function decrypt(data: string, key: string): string {
	return cryptoAdapter.decryptHmac(data, key);
}
