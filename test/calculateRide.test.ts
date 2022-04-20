import { calculateRide, Segment } from "../src/calculateRide";

describe("CalculateRide", (): void => {

    test("Invalid date to be -2", (): void => {
        expect((): number => calculateRide([new Segment(10, new Date("asbhbh"))])).toThrow(new Error("Invalid Date"));
    });

    test("Invalid dist should throw", (): void => {
        expect((): number => calculateRide([new Segment(-3, new Date("2021-03-01T10:00:00"))])).toThrow(new Error("Invalid Distance"));
    });

    test("Normal fare", (): void => {
        expect(calculateRide([new Segment(10, new Date("2021-03-01T10:00:00"))])).toBe(21);
    });

    test("Normal Night", (): void => {
        expect(calculateRide([new Segment(10, new Date("2021-03-01T23:00:00"))])).toBe(39);
    });

    test("Sunday fare", (): void => {
        expect(calculateRide([new Segment(10, new Date("2021-03-07T10:00:00"))])).toBe(29);
    });

    test("Sunday Night fare", (): void => {
        expect(calculateRide([new Segment(10, new Date("2021-03-07T23:00:00"))])).toBe(50);
    });

    test("Min fare", (): void => {
        expect(calculateRide([new Segment(1, new Date("2021-03-01T10:00:00"))])).toBe(10);
    });
});
