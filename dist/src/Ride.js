"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FareCalculator_1 = require("./FareCalculator");
class Segment {
    constructor(dist, date) {
        this.dist = dist;
        this.date = date;
        this.OVERNIGHT_START = 22;
        this.OVERNIGHT_END = 6;
        if (!this.isValidDistance(dist))
            throw new Error("Invalid Distance");
        if (!this.isValidDate(date))
            throw new Error("Invalid Date");
    }
    isValidDistance(dist) {
        return (dist != null && dist != undefined && typeof dist === "number" && dist > 0);
    }
    isValidDate(date) {
        return (date != null && date != undefined && date instanceof Date && date.toString() !== "Invalid Date");
    }
}
class Ride {
    constructor(fareCalculatorFactory) {
        this.MIN_FARE = 10;
        this.segments = [];
        this.fareCalculatorFactory = new FareCalculator_1.FareCalculatorFactory;
    }
    addSegment(dist, date) {
        this.segments.push(new Segment(dist, date));
    }
    calculateTotal() {
        let result = 0;
        for (const segment of this.segments) {
            let fareCalculator = this.fareCalculatorFactory.create(segment.dist, segment.date);
            result += fareCalculator.calculate(segment.dist, segment.date);
        }
        return (result < this.MIN_FARE) ? this.MIN_FARE : result;
    }
    finish() {
        return this.calculateTotal();
    }
}
exports.default = Ride;
