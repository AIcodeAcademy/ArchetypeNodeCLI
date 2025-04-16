/**
 * Validation utilities for system layer components
 */

/**
 * Validation error type
 */
export type ValidationError = {
	type: "VALIDATION_ERROR";
	message: string;
	path?: string;
	value?: unknown;
};

/**
 * Creates a validation error
 */
export const createValidationError = (
	message: string,
	path?: string,
	value?: unknown,
): ValidationError => ({
	type: "VALIDATION_ERROR",
	message,
	path,
	value,
});

/**
 * Checks if a result is a ValidationError
 */
export const isValidationError = (result: unknown): result is ValidationError =>
	typeof result === "object" &&
	result !== null &&
	"type" in result &&
	result.type === "VALIDATION_ERROR";

/**
 * Validator function type
 */
export type Validator<T> = (value: unknown) => T | ValidationError;

/**
 * String validator
 */
export const validateString = (value: unknown): string | ValidationError => {
	if (typeof value !== "string") {
		return createValidationError(
			`Expected string but got ${typeof value}`,
			undefined,
			value,
		);
	}
	return value;
};

/**
 * String validator with minimum length
 */
export const validateStringMinLength = (
	minLength: number,
): Validator<string> => {
	return (value: unknown): string | ValidationError => {
		const stringResult = validateString(value);
		if (isValidationError(stringResult)) {
			return stringResult;
		}

		if (stringResult.length < minLength) {
			return createValidationError(
				`String must be at least ${minLength} characters long`,
				undefined,
				value,
			);
		}

		return stringResult;
	};
};

/**
 * String validator with pattern matching
 */
export const validateStringPattern = (pattern: RegExp): Validator<string> => {
	return (value: unknown): string | ValidationError => {
		const stringResult = validateString(value);
		if (isValidationError(stringResult)) {
			return stringResult;
		}

		if (!pattern.test(stringResult)) {
			return createValidationError(
				`String must match pattern ${pattern}`,
				undefined,
				value,
			);
		}

		return stringResult;
	};
};

/**
 * Email validator
 */
export const validateEmail = (value: unknown): string | ValidationError => {
	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return validateStringPattern(emailPattern)(value);
};

/**
 * Number validator
 */
export const validateNumber = (value: unknown): number | ValidationError => {
	if (typeof value === "string") {
		const num = Number(value);
		if (!Number.isNaN(num)) {
			return num;
		}
	}

	if (typeof value !== "number" || Number.isNaN(value)) {
		return createValidationError(
			`Expected number but got ${typeof value}`,
			undefined,
			value,
		);
	}

	return value;
};

/**
 * Number validator with range
 */
export const validateNumberRange = (
	min: number,
	max: number,
): Validator<number> => {
	return (value: unknown): number | ValidationError => {
		const numResult = validateNumber(value);
		if (isValidationError(numResult)) {
			return numResult;
		}

		if (numResult < min || numResult > max) {
			return createValidationError(
				`Number must be between ${min} and ${max}`,
				undefined,
				value,
			);
		}

		return numResult;
	};
};

/**
 * Integer validator
 */
export const validateInteger = (value: unknown): number | ValidationError => {
	const numResult = validateNumber(value);
	if (isValidationError(numResult)) {
		return numResult;
	}

	if (!Number.isInteger(numResult)) {
		return createValidationError(
			`Expected integer but got ${numResult}`,
			undefined,
			value,
		);
	}

	return numResult;
};

/**
 * Boolean validator
 */
export const validateBoolean = (value: unknown): boolean | ValidationError => {
	if (typeof value === "string") {
		const lowerValue = value.toLowerCase();
		if (["true", "1", "yes"].includes(lowerValue)) {
			return true;
		}
		if (["false", "0", "no"].includes(lowerValue)) {
			return false;
		}
	}

	if (typeof value !== "boolean") {
		return createValidationError(
			`Expected boolean but got ${typeof value}`,
			undefined,
			value,
		);
	}

	return value;
};

/**
 * Array validator
 */
export const validateArray = <T>(
	itemValidator: Validator<T>,
): Validator<T[]> => {
	return (value: unknown): T[] | ValidationError => {
		if (!Array.isArray(value)) {
			return createValidationError(
				`Expected array but got ${typeof value}`,
				undefined,
				value,
			);
		}

		const validatedItems: T[] = [];
		for (let i = 0; i < value.length; i++) {
			const item = value[i];
			const validatedItem = itemValidator(item);

			if (isValidationError(validatedItem)) {
				return createValidationError(
					`Invalid item at index ${i}: ${validatedItem.message}`,
					`[${i}]`,
					item,
				);
			}

			validatedItems.push(validatedItem);
		}

		return validatedItems;
	};
};

/**
 * Object validator
 */
export const validateObject = <T>(
	schema: Record<string, Validator<unknown>>,
): Validator<T> => {
	return (value: unknown): T | ValidationError => {
		if (!value || typeof value !== "object" || Array.isArray(value)) {
			return createValidationError(
				`Expected object but got ${Array.isArray(value) ? "array" : typeof value}`,
				undefined,
				value,
			);
		}

		const validatedObject: Record<string, unknown> = {};

		for (const [key, validator] of Object.entries(schema)) {
			const propValue = (value as Record<string, unknown>)[key];
			const validatedValue = validator(propValue);

			if (isValidationError(validatedValue)) {
				return createValidationError(
					`Invalid property "${key}": ${validatedValue.message}`,
					key,
					propValue,
				);
			}

			validatedObject[key] = validatedValue;
		}

		return validatedObject as T;
	};
};

/**
 * Optional field validator
 */
export const validateOptional = <T>(
	validator: Validator<T>,
): Validator<T | undefined> => {
	return (value: unknown): T | undefined | ValidationError => {
		if (value === undefined || value === null) {
			return undefined;
		}
		return validator(value);
	};
};

/**
 * Default value validator
 */
export const validateWithDefault = <T>(
	validator: Validator<T>,
	defaultValue: T,
): Validator<T> => {
	return (value: unknown): T | ValidationError => {
		if (value === undefined || value === null) {
			return defaultValue;
		}
		return validator(value);
	};
};
