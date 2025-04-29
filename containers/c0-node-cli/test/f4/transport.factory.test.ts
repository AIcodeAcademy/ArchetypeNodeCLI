import assert from "node:assert";
import { describe, it } from "node:test";
import type { LogTransportConfig } from "../../src/system/log/log-config.type.ts";
import { transportFactory } from "../../src/system/log/transport.factory.ts";

describe("Transport Factory", () => {
	it("should create console transport with valid config", () => {
		const config: LogTransportConfig = {
			type: "console",
			minLevel: "info",
			formatter: "pretty",
			timestamp: true,
		};
		const transport = transportFactory(config);
		assert.ok(transport);
		assert.strictEqual(typeof transport?.write, "function");
	});

	it("should create file transport with valid config", () => {
		const config: LogTransportConfig = {
			type: "file",
			minLevel: "info",
			formatter: "csv",
			timestamp: true,
			path: "test.log",
		};
		const transport = transportFactory(config);
		assert.ok(transport);
		assert.strictEqual(typeof transport?.write, "function");
	});

	it("should return undefined for unknown transport type", () => {
		const config = {
			type: "unknown",
			minLevel: "info",
			formatter: "pretty",
			timestamp: true,
		} as unknown as LogTransportConfig;
		const transport = transportFactory(config);
		assert.strictEqual(transport, undefined);
	});

	it("should return undefined for http transport (not implemented)", () => {
		const config: LogTransportConfig = {
			type: "http",
			minLevel: "info",
			formatter: "json",
			timestamp: true,
		};
		const transport = transportFactory(config);
		assert.strictEqual(transport, undefined);
	});

	it("should handle invalid transport configuration gracefully", () => {
		const config = {
			type: "console",
			minLevel: "invalid",
			formatter: "invalid",
			timestamp: true,
		} as unknown as LogTransportConfig;
		const transport = transportFactory(config);
		assert.ok(transport);
	});
});
