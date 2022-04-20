// @ts-nocheck
// calculate ride

function isValidDistance(dist: number): boolean {
	return (dist != null && dist != undefined && typeof dist === "number" && dist > 0);
}

function isValidDate(date: Date): boolean {
	return (date != null && date != undefined && date instanceof Date && date.toString() !== "Invalid Date");
}

function isOvernight(time): boolean {
	return (time >= 22 || time <= 6)
}

function isSunday(day): boolean {
	return (day === 0);
}

export class Segment {
	OVERNIGHT_START = 22;
	OVERNIGHT_END = 6;

	constructor(readonly distance: number, readonly date: Date) {
	}
}

export function calculateRide(segments: Segment[]): number {
	const minFare = 10;
	const normalFare = 2.10;
	const nightFare = 3.90;
	const sundayFare = 2.90;
	const sundayNightFare = 5.0;

	let result = 0;
	for (const segment of segments) {
		if (!isValidDistance(segment.distance)) throw new Error("Invalid Distance");
		if (!isValidDate(segment.date)) throw new Error("Invalid Date");
		if (isOvernight(segment.date.getHours()) && !isSunday(segment.date.getDay())) {
			result += segment.distance * nightFare;
			continue;
		}
		if (isOvernight(segment.date.getHours()) && isSunday(segment.date.getDay())) {
			result += segment.distance * sundayNightFare;
			continue;
		}
		if (isSunday(segment.date.getDay())) {
			result += segment.distance * sundayFare;
			continue;
		}
		result += segment.distance * normalFare;
	}
	return (result < minFare) ? minFare : result;
}
