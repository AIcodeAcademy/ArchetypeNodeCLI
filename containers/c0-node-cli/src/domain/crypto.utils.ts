import { cryptoAdapter } from "./crypto.adapter.ts";

const TOKEN_LENGTH = 32;

export const crypto = {
	hashPassword: (password: string): string => cryptoAdapter.hashText(password),

	validatePassword: (password: string, hash: string): boolean =>
		crypto.hashPassword(password) === hash,

	generateToken: (length = TOKEN_LENGTH): string =>
		cryptoAdapter.randomBytesString(length),

	encrypt: (data: string, key: string): string =>
		cryptoAdapter.encrypt(data, key),

	decrypt: (data: string, key: string): string =>
		cryptoAdapter.decrypt(data, key),
};
