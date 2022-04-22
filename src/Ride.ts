function isValidDistance(dist: number): boolean {
    return (dist != null && dist != undefined && typeof dist === "number" && dist > 0);
}

function isValidDate(date: Date): boolean {
    return (date != null && date != undefined && date instanceof Date && date.toString() !== "Invalid Date");
}

function isOvernight(time: number): boolean {
    return (time >= 22 || time <= 6)
}

function isSunday(day: number): boolean {
    return (day === 0);
}


class Segment {
    OVERNIGHT_START = 22;
    OVERNIGHT_END = 6;

    constructor(readonly distance: number, readonly date: Date) {
    }
}

export default class Ride {
    segments: Segment[];

    minFare = 10;
    normalFare = 2.10;
    nightFare = 3.90;
    sundayFare = 2.90;
    sundayNightFare = 5.0;

    constructor() {
        this.segments = [];
    }

    addSegment(dist: number, date: Date): void {
        this.segments.push(new Segment(dist, date));
    }

    finish(): number {
        let result = 0;
        for (const segment of this.segments) {
            if (!isValidDistance(segment.distance)) throw new Error("Invalid Distance");
            if (!isValidDate(segment.date)) throw new Error("Invalid Date");
            if (isOvernight(segment.date.getHours()) && !isSunday(segment.date.getDay())) {
                result += segment.distance * this.nightFare;
                continue;
            }
            if (isOvernight(segment.date.getHours()) && isSunday(segment.date.getDay())) {
                result += segment.distance * this.sundayNightFare;
                continue;
            }
            if (isSunday(segment.date.getDay())) {
                result += segment.distance * this.sundayFare;
                continue;
            }
            result += segment.distance * this.normalFare;
        }
        return (result < this.minFare) ? this.minFare : result;
    }
}