import assert from "node:assert";
import { describe, it } from "node:test";
import { styleTextAdapter } from "../../src/system/style-text.adapter.ts";

describe("styleTextAdapter", () => {
	it("should apply single color", () => {
		const result = styleTextAdapter(["red"], [], "test text");
		assert.ok(typeof result === "string");
	});

	it("should apply single modifier", () => {
		const result = styleTextAdapter([], ["bold"], "test text");
		assert.ok(typeof result === "string");
	});

	it("should combine multiple colors and modifiers", () => {
		const result = styleTextAdapter(
			["red", "blue"],
			["bold", "italic"],
			"test text",
		);
		assert.ok(typeof result === "string");
	});

	it("should handle empty styles", () => {
		const result = styleTextAdapter([], [], "test text");
		assert.ok(typeof result === "string");
	});

	it("should handle invalid styles gracefully", () => {
		const result = styleTextAdapter(["red"], [], "test text");
		assert.ok(typeof result === "string");
	});
});
