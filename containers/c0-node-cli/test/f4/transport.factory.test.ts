import { strict as assert } from "node:assert";
import { describe, test } from "node:test";
import type { LogTransportConfig } from "../../src/system/log/log-config.type.ts";
import { transportFactory } from "../../src/system/log/transport.factory.ts";

/**
 * @feature Transport Factory
 * @scenario Create different types of transports
 * Given a transport factory
 * When creating different types of transports
 * Then it should properly instantiate the correct transport type
 */
describe("Given transportFactory", () => {
	const createConsoleConfig = (): LogTransportConfig => ({
		type: "console",
		minLevel: "info",
		formatter: "pretty",
		timestamp: true,
	});

	const createFileConfig = (): LogTransportConfig => ({
		type: "file",
		minLevel: "info",
		formatter: "csv",
		timestamp: true,
		path: "test.log",
	});

	describe("When creating console transport", () => {
		const config = createConsoleConfig();

		test("Then it should return a console transport instance", () => {
			// Act: Create transport
			const transport = transportFactory.create(config);

			// Assert: Verify transport was created
			assert.ok(transport, "Transport should be created");
			assert.strictEqual(
				transport?.constructor.name,
				"TransportConsole",
				"Should create console transport",
			);
		});
	});

	describe("When creating file transport", () => {
		const config = createFileConfig();

		test("Then it should return a file transport instance", () => {
			// Act: Create transport
			const transport = transportFactory.create(config);

			// Assert: Verify transport was created
			assert.ok(transport, "Transport should be created");
			assert.strictEqual(
				transport?.constructor.name,
				"TransportFile",
				"Should create file transport",
			);
		});
	});

	describe("When creating transport with invalid type", () => {
		const config = {
			...createConsoleConfig(),
			type: "invalid" as "console",
		} as unknown as LogTransportConfig;

		test("Then it should return undefined", () => {
			// Act: Create transport
			const transport = transportFactory.create(config);

			// Assert: Verify undefined was returned
			assert.strictEqual(
				transport,
				undefined,
				"Invalid transport type should return undefined",
			);
		});
	});
});
