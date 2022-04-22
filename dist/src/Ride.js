"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidDistance(dist) {
    return (dist != null && dist != undefined && typeof dist === "number" && dist > 0);
}
function isValidDate(date) {
    return (date != null && date != undefined && date instanceof Date && date.toString() !== "Invalid Date");
}
function isOvernight(time) {
    return (time >= 22 || time <= 6);
}
function isSunday(day) {
    return (day === 0);
}
class Segment {
    constructor(distance, date) {
        this.distance = distance;
        this.date = date;
        this.OVERNIGHT_START = 22;
        this.OVERNIGHT_END = 6;
    }
}
class Ride {
    constructor() {
        this.minFare = 10;
        this.normalFare = 2.10;
        this.nightFare = 3.90;
        this.sundayFare = 2.90;
        this.sundayNightFare = 5.0;
        this.segments = [];
    }
    addSegment(dist, date) {
        this.segments.push(new Segment(dist, date));
    }
    finish() {
        let result = 0;
        for (const segment of this.segments) {
            if (!isValidDistance(segment.distance))
                throw new Error("Invalid Distance");
            if (!isValidDate(segment.date))
                throw new Error("Invalid Date");
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
exports.default = Ride;
