import assert from "node:assert";
import { describe, it } from "node:test";
import { styleTextFactory } from "../../src/system/log/formatter-style.factory.ts";
import type { LogLevelType } from "../../src/system/log/log-level.type.ts";

describe("Formatter Style Factory", () => {
	it("should create style function for error level", () => {
		const styleFn = styleTextFactory("error");
		assert.ok(styleFn);
		const styledText = styleFn("Test message");
		assert.ok(styledText.includes("Test message"));
	});

	it("should create style function for warn level", () => {
		const styleFn = styleTextFactory("warn");
		assert.ok(styleFn);
		const styledText = styleFn("Test message");
		assert.ok(styledText.includes("Test message"));
	});

	it("should create style function for info level", () => {
		const styleFn = styleTextFactory("info");
		assert.ok(styleFn);
		const styledText = styleFn("Test message");
		assert.ok(styledText.includes("Test message"));
	});

	it("should create style function for debug level", () => {
		const styleFn = styleTextFactory("debug");
		assert.ok(styleFn);
		const styledText = styleFn("Test message");
		assert.ok(styledText.includes("Test message"));
	});

	it("should return identity function for unknown level", () => {
		const styleFn = styleTextFactory("unknown" as LogLevelType);
		assert.ok(styleFn);
		const styledText = styleFn("Test message");
		assert.strictEqual(styledText, "Test message");
	});
});
