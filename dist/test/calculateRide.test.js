"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculateRide_1 = require("../src/calculateRide");
describe("CalculateRide", () => {
    test("Invalid date to be -2", () => {
        expect(() => (0, calculateRide_1.calculateRide)([new calculateRide_1.Segment(10, new Date("asbhbh"))])).toThrow(new Error("Invalid Date"));
    });
    test("Invalid dist should throw", () => {
        expect(() => (0, calculateRide_1.calculateRide)([new calculateRide_1.Segment(-3, new Date("2021-03-01T10:00:00"))])).toThrow(new Error("Invalid Distance"));
    });
    test("Normal fare", () => {
        expect((0, calculateRide_1.calculateRide)([new calculateRide_1.Segment(10, new Date("2021-03-01T10:00:00"))])).toBe(21);
    });
    test("Normal Night", () => {
        expect((0, calculateRide_1.calculateRide)([new calculateRide_1.Segment(10, new Date("2021-03-01T23:00:00"))])).toBe(39);
    });
    test("Sunday fare", () => {
        expect((0, calculateRide_1.calculateRide)([new calculateRide_1.Segment(10, new Date("2021-03-07T10:00:00"))])).toBe(29);
    });
    test("Sunday Night fare", () => {
        expect((0, calculateRide_1.calculateRide)([new calculateRide_1.Segment(10, new Date("2021-03-07T23:00:00"))])).toBe(50);
    });
    test("Min fare", () => {
        expect((0, calculateRide_1.calculateRide)([new calculateRide_1.Segment(1, new Date("2021-03-01T10:00:00"))])).toBe(10);
    });
});
