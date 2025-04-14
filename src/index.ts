/**
 * ArchetypeNodeCLI main entry point
 */
import { runUtilitiesDemo } from "./app/utilities-example.command.js";
import { logInfo } from "./utils/log.utils.js";

// Welcome message
logInfo("Welcome to Archetype Node CLI");

// Run the utilities example demonstration
runUtilitiesDemo();
