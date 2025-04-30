import assert from "node:assert";
import { describe, test } from "node:test";
import { styleTextAdapter } from "../../src/system/style-text.adapter.ts";

/**
 * Given styleTextAdapter
 * When applying single color
 * Then it should return styled text
 * When applying single modifier
 * Then it should return styled text
 * When applying color and modifier
 * Then it should return styled text
 */
describe("Given styleTextAdapter", () => {
	describe("When applying single color", () => {
		const inputText = "Test text";

		test("Then it should return styled text", () => {
			// Act
			const result = styleTextAdapter(["red"], [], inputText);
			// Assert
			assert.strictEqual(result, `\x1b[31m${inputText}\x1b[39m`);
		});
	});

	describe("When applying single modifier", () => {
		const inputText = "Test text";

		test("Then it should return styled text", () => {
			// Act
			const result = styleTextAdapter([], ["bold"], inputText);
			// Assert
			assert.strictEqual(result, `\x1B[1m${inputText}\x1B[22m`);
		});
	});

	describe("When applying color and modifier", () => {
		const inputText = "Test text";

		test("Then it should return styled text", () => {
			// Act
			const result = styleTextAdapter(["red"], ["bold"], inputText);
			// Assert
			assert.strictEqual(result, `\x1B[31m\x1B[1m${inputText}\x1B[22m\x1B[39m`);
		});
	});
});
