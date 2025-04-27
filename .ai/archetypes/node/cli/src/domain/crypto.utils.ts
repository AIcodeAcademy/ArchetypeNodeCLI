import {
	decryptHmac,
	encryptHmac,
	hashText,
	randomBytesString,
} from "./crypto.adapter";

const TOKEN_LENGTH = 32;

export function hashPassword(password: string): string {
	return hashText(password);
}

export function validatePassword(password: string, hash: string): boolean {
	return hashPassword(password) === hash;
}

export function generateToken(length = TOKEN_LENGTH): string {
	return randomBytesString(length);
}

export function encrypt(data: string, key: string): string {
	return encryptHmac(data, key);
}

export function decrypt(data: string, key: string): string {
	return decryptHmac(data, key);
}
