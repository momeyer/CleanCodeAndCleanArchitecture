import { FareCalculatorFactory } from "./FareCalculator";


class Segment {
    OVERNIGHT_START = 22;
    OVERNIGHT_END = 6;

    constructor(readonly dist: number, readonly date: Date) {
        if (!this.isValidDistance(dist)) throw new Error("Invalid Distance");
        if (!this.isValidDate(date)) throw new Error("Invalid Date");
    }

    isValidDistance(dist: number): boolean {
        return (dist != null && dist != undefined && typeof dist === "number" && dist > 0);
    }

    isValidDate(date: Date): boolean {
        return (date != null && date != undefined && date instanceof Date && date.toString() !== "Invalid Date");
    }
}

export default class Ride {
    segments: Segment[];
    fareCalculatorFactory: FareCalculatorFactory;

    MIN_FARE = 10;

    constructor(fareCalculatorFactory: FareCalculatorFactory) {
        this.segments = [];
        this.fareCalculatorFactory = new FareCalculatorFactory;
    }

    addSegment(dist: number, date: Date): void {
        this.segments.push(new Segment(dist, date));
    }

    calculateTotal(): number {
        let result = 0;
        for (const segment of this.segments) {
            let fareCalculator = this.fareCalculatorFactory.create(segment.dist, segment.date);
            result += fareCalculator.calculate(segment.dist, segment.date);
        }
        return (result < this.MIN_FARE) ? this.MIN_FARE : result;
    }

    finish(): number {
        return this.calculateTotal();
    }
}