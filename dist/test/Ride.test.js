"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FareCalculator_1 = require("../src/FareCalculator");
const Ride_1 = __importDefault(require("../src/Ride"));
describe("CalculateRide", () => {
    const fareCalculatorFactory = new FareCalculator_1.FareCalculatorFactory();
    const normalDay = "2021-03-01T10:00:00";
    const normalNight = "2021-03-01T23:00:00";
    const sunday = "2021-03-07T10:00:00";
    const sundayNight = "2021-03-07T23:00:00";
    test("Invalid date to be -2", () => {
        const ride = new Ride_1.default(fareCalculatorFactory);
        expect(() => ride.addSegment(3, new Date("abcde"))).toThrow(new Error("Invalid Date"));
    });
    test("Invalid dist should throw", () => {
        const ride = new Ride_1.default(fareCalculatorFactory);
        expect(() => ride.addSegment(-3, new Date(normalDay))).toThrow(new Error("Invalid Distance"));
    });
    test("Normal fare", () => {
        const ride = new Ride_1.default(fareCalculatorFactory);
        ride.addSegment(10, new Date(normalDay));
        expect(ride.finish()).toBe(21);
    });
    test("Normal Night", () => {
        const ride = new Ride_1.default(fareCalculatorFactory);
        ride.addSegment(10, new Date(normalNight));
        expect(ride.finish()).toBe(39);
    });
    test("Sunday fare", () => {
        const ride = new Ride_1.default(fareCalculatorFactory);
        ride.addSegment(10, new Date(sunday));
        expect(ride.finish()).toBe(29);
    });
    test("Sunday Night fare", () => {
        const ride = new Ride_1.default(fareCalculatorFactory);
        ride.addSegment(10, new Date(sundayNight));
        expect(ride.finish()).toBe(50);
    });
    test("Many Segments", () => {
        const ride = new Ride_1.default(fareCalculatorFactory);
        ride.addSegment(1, new Date(normalDay)); //  2.10
        ride.addSegment(10, new Date(normalNight)); // 39.00
        ride.addSegment(10, new Date(sunday)); // 29.00
        ride.addSegment(10, new Date(sundayNight)); // 50.00
        expect(ride.finish()).toBe(120.1);
    });
    test("Min fare", () => {
        const ride = new Ride_1.default(fareCalculatorFactory);
        ride.addSegment(1, new Date(normalDay));
        expect(ride.finish()).toBe(10);
    });
});
