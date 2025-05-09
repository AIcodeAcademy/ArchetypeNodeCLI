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
