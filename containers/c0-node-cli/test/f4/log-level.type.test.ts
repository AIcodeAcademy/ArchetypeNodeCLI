import assert from "node:assert";
import { describe, it } from "node:test";
import type { LogLevelType } from "../../src/system/log/log-level.type.ts";
import { LOG_LEVELS } from "../../src/system/log/log-level.type.ts";

describe("Log Level Types", () => {
	it("should have correct log levels in order", () => {
		assert.strictEqual(LOG_LEVELS.length, 4);
		assert.strictEqual(LOG_LEVELS[0].level, "debug");
		assert.strictEqual(LOG_LEVELS[1].level, "info");
		assert.strictEqual(LOG_LEVELS[2].level, "warn");
		assert.strictEqual(LOG_LEVELS[3].level, "error");
	});

	it("should have correct log level IDs", () => {
		assert.strictEqual(LOG_LEVELS[0].id, 0);
		assert.strictEqual(LOG_LEVELS[1].id, 1);
		assert.strictEqual(LOG_LEVELS[2].id, 2);
		assert.strictEqual(LOG_LEVELS[3].id, 3);
	});

	it("should have valid log level type", () => {
		const validLevels: LogLevelType[] = ["debug", "info", "warn", "error"];
		for (const level of validLevels) {
			assert.ok(LOG_LEVELS.some((l) => l.level === level));
		}
	});
});
