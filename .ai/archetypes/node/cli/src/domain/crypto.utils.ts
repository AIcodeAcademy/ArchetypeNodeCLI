import {
	decryptHmac,
	encryptHmac,
	hashText,
	randomBytesString,
} from "./crypto.adapter";

const ALGORITHM = "sha256";
const ENCODING = "hex";

export function hashPassword(password: string): string {
	return hashText(password, ALGORITHM, ENCODING);
}

export function validatePassword(password: string, hash: string): boolean {
	return hashPassword(password) === hash;
}

export function generateToken(length = 32): string {
	return randomBytesString(length, ENCODING);
}

export function encrypt(data: string, key: string): string {
	return encryptHmac(data, key, ALGORITHM, ENCODING);
}

export function decrypt(data: string, key: string): string {
	return decryptHmac(data, key, ALGORITHM, ENCODING);
}
