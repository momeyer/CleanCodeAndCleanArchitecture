"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ride_1 = __importDefault(require("../src/Ride"));
describe("CalculateRide", () => {
    test("Invalid date to be -2", () => {
        const ride = new Ride_1.default();
        ride.addSegment(3, new Date("abcde"));
        expect(() => ride.finish()).toThrow(new Error("Invalid Date"));
    });
    test("Invalid dist should throw", () => {
        const ride = new Ride_1.default();
        ride.addSegment(-3, new Date("2021-03-01T10:00:00"));
        expect(() => ride.finish()).toThrow(new Error("Invalid Distance"));
    });
    test("Normal fare", () => {
        const ride = new Ride_1.default();
        ride.addSegment(10, new Date("2021-03-01T10:00:00"));
        expect(ride.finish()).toBe(21);
    });
    test("Normal Night", () => {
        const ride = new Ride_1.default();
        ride.addSegment(10, new Date("2021-03-01T23:00:00"));
        expect(ride.finish()).toBe(39);
    });
    test("Sunday fare", () => {
        const ride = new Ride_1.default();
        ride.addSegment(10, new Date("2021-03-07T10:00:00"));
        expect(ride.finish()).toBe(29);
    });
    test("Sunday Night fare", () => {
        const ride = new Ride_1.default();
        ride.addSegment(10, new Date("2021-03-07T23:00:00"));
        expect(ride.finish()).toBe(50);
    });
    test("Min fare", () => {
        const ride = new Ride_1.default();
        ride.addSegment(1, new Date("2021-03-01T10:00:00"));
        expect(ride.finish()).toBe(10);
    });
});
