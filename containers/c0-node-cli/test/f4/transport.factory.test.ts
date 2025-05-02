import assert from "node:assert";
import { describe, test } from "node:test";
import type { LogTransportConfig } from "../../src/system/log/log-config.type.ts";
import { transportFactory } from "../../src/system/log/transport.factory.ts";

/**
 * Given a transport factory
 * When creating console transport
 * Then it should return a console transport instance
 * When creating file transport
 * Then it should return a file transport instance
 * When creating transport with invalid type
 * Then it should return undefined
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
			// Act
			const transport = transportFactory.create(config);

			// Assert
			assert.ok(transport, "Transport should be created");
			assert.strictEqual(
				transport?.constructor.name,
				"TransportConsoleRepository",
				"Should create console transport",
			);
		});
	});

	describe("When creating file transport", () => {
		const config = createFileConfig();

		test("Then it should return a file transport instance", () => {
			// Act
			const transport = transportFactory.create(config);

			// Assert
			assert.ok(transport, "Transport should be created");
			assert.strictEqual(
				transport?.constructor.name,
				"TransportFileRepository",
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
			// Act
			const transport = transportFactory.create(config);

			// Assert
			assert.strictEqual(
				transport,
				undefined,
				"Invalid transport type should return undefined",
			);
		});
	});
});
