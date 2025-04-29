import assert from "node:assert";
import { describe, it } from "node:test";
import type { LogTransportConfig } from "../../src/system/log/log-config.type.ts";
import type { LogEntry } from "../../src/system/log/log-entry.type.ts";
import { TransportConsole } from "../../src/system/log/transport-console.repository.ts";

describe("Console Transport", () => {
	it("should write log entry to console", () => {
		const config: LogTransportConfig = {
			type: "console",
			minLevel: "info",
			formatter: "pretty",
			timestamp: true,
		};
		const transport = new TransportConsole(config);
		const logEntry: LogEntry = {
			level: "info",
			message: "Test message",
			timestamp: new Date().toISOString(),
		};

		// Mock console.log to capture output
		const originalConsoleLog = console.log;
		let loggedMessage = "";
		console.log = (msg: string) => {
			loggedMessage = msg;
		};

		try {
			transport.write(logEntry);
			assert.ok(loggedMessage.includes("Test message"));
			assert.ok(loggedMessage.includes("info"));
		} finally {
			console.log = originalConsoleLog;
		}
	});

	it("should write log entry with context to console", () => {
		const config: LogTransportConfig = {
			type: "console",
			minLevel: "info",
			formatter: "pretty",
			timestamp: true,
		};
		const transport = new TransportConsole(config);
		const context = { key: "value" };
		const logEntry: LogEntry = {
			level: "info",
			message: "Test message",
			timestamp: new Date().toISOString(),
			context,
		};

		// Mock console.log to capture output
		const originalConsoleLog = console.log;
		const loggedMessages: string[] = [];
		console.log = (msg: string) => {
			loggedMessages.push(msg);
		};

		try {
			transport.write(logEntry);
			assert.strictEqual(loggedMessages.length, 2);
			assert.ok(loggedMessages[0].includes("Test message"));
			assert.deepStrictEqual(loggedMessages[1], context);
		} finally {
			console.log = originalConsoleLog;
		}
	});

	it("should respect formatter configuration", () => {
		const config: LogTransportConfig = {
			type: "console",
			minLevel: "info",
			formatter: "json",
			timestamp: true,
		};
		const transport = new TransportConsole(config);
		const logEntry: LogEntry = {
			level: "info",
			message: "Test message",
			timestamp: new Date().toISOString(),
		};

		// Mock console.log to capture output
		const originalConsoleLog = console.log;
		let loggedMessage = "";
		console.log = (msg: string) => {
			loggedMessage = msg;
		};

		try {
			transport.write(logEntry);
			const parsedMessage = JSON.parse(loggedMessage);
			assert.strictEqual(parsedMessage.level, "info");
			assert.strictEqual(parsedMessage.message, "Test message");
			assert.ok(parsedMessage.timestamp);
		} finally {
			console.log = originalConsoleLog;
		}
	});
});
