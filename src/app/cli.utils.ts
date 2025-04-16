/**
 * utilities to be used in the CLI
 */
export { getArgs, getCommand };

function getCommand() {
	return process.argv[2] || "help";
}
function getArgs() {
	return process.argv.slice(3);
}
