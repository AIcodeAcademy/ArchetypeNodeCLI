import crypto from "node:crypto";

const ALGORITHM = "sha256";
const ENCODING = "hex";

export function hashPassword(password: string): string {
	return crypto.createHash(ALGORITHM).update(password).digest(ENCODING);
}

export function validatePassword(password: string, hash: string): boolean {
	return hashPassword(password) === hash;
}

export function generateToken(length = 32): string {
	return crypto.randomBytes(length).toString(ENCODING);
}

export function encrypt(data: string, key: string): string {
	return crypto.createHmac(ALGORITHM, key).update(data).digest(ENCODING);
}

export function decrypt(data: string, key: string): string {
	return crypto.createHmac(ALGORITHM, key).update(data).digest(ENCODING);
}
