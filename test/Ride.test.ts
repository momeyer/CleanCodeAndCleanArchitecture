import Ride from "../src/Ride";

describe("CalculateRide", (): void => {

    test("Invalid date to be -2", (): void => {

        const ride = new Ride();
        ride.addSegment(3, new Date("abcde"));
        expect((): number => ride.finish()).toThrow(new Error("Invalid Date"));
    });

    test("Invalid dist should throw", (): void => {
        const ride = new Ride();
        ride.addSegment(-3, new Date("2021-03-01T10:00:00"));
        expect((): number => ride.finish()).toThrow(new Error("Invalid Distance"));
    });

    test("Normal fare", (): void => {
        const ride = new Ride();
        ride.addSegment(10, new Date("2021-03-01T10:00:00"));
        expect(ride.finish()).toBe(21);
    });

    test("Normal Night", (): void => {
        const ride = new Ride();
        ride.addSegment(10, new Date("2021-03-01T23:00:00"));
        expect(ride.finish()).toBe(39);
    });

    test("Sunday fare", (): void => {
        const ride = new Ride();
        ride.addSegment(10, new Date("2021-03-07T10:00:00"));
        expect(ride.finish()).toBe(29);
    });

    test("Sunday Night fare", (): void => {
        const ride = new Ride();
        ride.addSegment(10, new Date("2021-03-07T23:00:00"));
        expect(ride.finish()).toBe(50);
    });

    test("Min fare", (): void => {
        const ride = new Ride();
        ride.addSegment(1, new Date("2021-03-01T10:00:00"));
        expect(ride.finish()).toBe(10);
    });
});
