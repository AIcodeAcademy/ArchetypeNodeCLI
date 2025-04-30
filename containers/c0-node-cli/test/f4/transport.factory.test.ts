import { strict as assert } from "node:assert";
import { describe, test } from "node:test";
import type { LogTransportConfig } from "../../src/system/log/log-config.type.ts";
import { transportFactory } from "../../src/system/log/transport.factory.ts";

/**
 * @description
 * Given a logging transport factory
 * When creating different types of transports
 * Then it should properly instantiate the correct transport type
 */
describe("Transport Factory", () => {
	/**
	 * @description
	 * Given a console transport configuration
	 * When creating a transport
	 * Then it should return a console transport instance
	 */
	test("should create console transport", () => {
		const config: LogTransportConfig = {
			type: "console",
			minLevel: "info",
			formatter: "pretty",
			timestamp: true,
		};

		const transport = transportFactory(config);
		assert.ok(transport, "Transport should be created");
		assert.strictEqual(transport?.constructor.name, "ConsoleTransport");
	});

	/**
	 * @description
	 * Given a file transport configuration
	 * When creating a transport
	 * Then it should return a file transport instance
	 */
	test("should create file transport", () => {
		const config: LogTransportConfig = {
			type: "file",
			minLevel: "info",
			formatter: "csv",
			timestamp: true,
			path: "test.log",
		};

		const transport = transportFactory(config);
		assert.ok(transport, "Transport should be created");
		assert.strictEqual(transport?.constructor.name, "FileTransport");
	});

	/**
	 * @description
	 * Given an invalid transport configuration
	 * When creating a transport
	 * Then it should return null
	 */
	test("should handle invalid transport type", () => {
		const config = {
			type: "invalid" as "console",
			minLevel: "info",
			formatter: "pretty",
			timestamp: true,
		} as unknown as LogTransportConfig;

		const transport = transportFactory(config);
		assert.strictEqual(
			transport,
			null,
			"Invalid transport type should return null",
		);
	});
});
