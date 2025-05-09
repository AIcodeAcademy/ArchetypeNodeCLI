export function getTimeString(date: Date = new Date()): string {
	return date.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
}

export function getDateString(date: Date = new Date()): string {
	return date.toLocaleDateString([], {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
}
export function stringToMs(source: string | number): number {
	if (typeof source === "number") return source;
	// 1d, 1h, 1m, 1s
	const value = Number.parseInt(source[0]);
	if (Number.isNaN(value)) {
		return Number(0);
	}
	const unit = source[1]?.toLowerCase() ?? "s";
	switch (unit) {
		case "d":
			return value * 1000 * 60 * 60 * 24;
		case "h":
			return value * 1000 * 60 * 60;
		case "m":
			return value * 1000 * 60;
		case "s":
			return value * 1000;
		default:
			return value;
	}
}
