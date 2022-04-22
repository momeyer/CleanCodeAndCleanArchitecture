# CleanCodeAndCleanArchitecture


course description


# Refactoring Exercise: [Original](https://github.com/rodrigobranas/cccat6_refactoring/blob/master/src/example1/before/calc.ts)


## Starting a project:

- install Nodejs

- run

        npm init -y (generate package.json)
        npm install typescript jest @types/jest ts-jest ts-node
        npx tsc --init (generate tsconfig.json)


## First Example:

- Original Code:
```typescript
// @ts-nocheck
// calculate ride
export function calc (movArray) {
    let result = 0;
    for (const mov of movArray) {
        if (mov.dist != null && mov.dist != undefined && typeof mov.dist === "number" && mov.dist > 0) {
            if (mov.ds != null && mov.ds != undefined && mov.ds instanceof Date && mov.ds.toString() !== "Invalid Date") {
    
                // overnight
            
                if (mov.ds.getHours() >= 22 || mov.ds.getHours() <= 6) {
            
                    // not sunday
                    if (mov.ds.getDay() !== 0) {
                        
                        result += mov.dist * 3.90;
                    // sunday
                    } else {
                        result += mov.dist * 5;
    
                    }
                } else {
                    // sunday
                    if (mov.ds.getDay() === 0) {
            
                        result += mov.dist * 2.9;
            
                    } else {
                        result += mov.dist * 2.10;
            
                    }
                }
            } else {
                // console.log(d);
                return -2;
            }
        } else {
            // console.log(dist);
    
            return -1;
        }
        
    }
    if (result < 10) {
        return 10;
    } else {
        return result;
    }
}
```


- Refactored:

```typescript
export default class Ride {
    fareCalculatorFactory: FareCalculatorFactory;
    segments: Segment[];

    MIN_FARE = 10;

    constructor(fareCalculatorFactory: FareCalculatorFactory) {
        this.fareCalculatorFactory = fareCalculatorFactory;
        this.segments = [];
    }

    addSegment(dist: number, date: DateAndTime): void {
        this.segments.push(new Segment(dist, date));
    }

    calculateTotal(): number {
        let result = 0;
        for (const segment of this.segments) {
            let fareCalculator = this.fareCalculatorFactory.create(segment.date);
            result += fareCalculator.calculate(segment.dist);
        }
        return (result < this.MIN_FARE) ? this.MIN_FARE : result;
    }

    finish(): number {
        return this.calculateTotal();
    }
}
```


- Tests

```typescript
describe("CalculateRide", (): void => {

    const fareCalculatorFactory = new FareCalculatorFactory();
    const normalDay = "2021-03-01T10:00:00";
    const normalNight = "2021-03-01T23:00:00";
    const sunday = "2021-03-07T10:00:00";
    const sundayNight = "2021-03-07T23:00:00";

    test("Invalid date should Throw", (): void => {

        const ride = new Ride(fareCalculatorFactory);
        expect((): void => ride.addSegment(3, new DateAndTime("abcde"))).toThrow(new Error("Invalid Date"));
    });

    test("Invalid dist should throw", (): void => {
        const ride = new Ride(fareCalculatorFactory);
        expect((): void => ride.addSegment(-3, new DateAndTime(normalDay))).toThrow(new Error("Invalid Distance"));
    });

    test("Normal fare", (): void => {
        const ride = new Ride(fareCalculatorFactory);
        ride.addSegment(10, new DateAndTime(normalDay));
        expect(ride.finish()).toBe(21);
    });

    test("Normal Night", (): void => {
        const ride = new Ride(fareCalculatorFactory);
        ride.addSegment(10, new DateAndTime(normalNight));
        expect(ride.finish()).toBe(39);
    });

    test("Sunday fare", (): void => {
        const ride = new Ride(fareCalculatorFactory);
        ride.addSegment(10, new DateAndTime(sunday));
        expect(ride.finish()).toBe(29);
    });

    test("Sunday Night fare", (): void => {
        const ride = new Ride(fareCalculatorFactory);
        ride.addSegment(10, new DateAndTime(sundayNight));
        expect(ride.finish()).toBe(50);
    });

    test("Many Segments", (): void => {
        const ride = new Ride(fareCalculatorFactory);
        ride.addSegment(1, new DateAndTime(normalDay));    //  2.10
        ride.addSegment(10, new DateAndTime(normalNight)); // 39.00
        ride.addSegment(10, new DateAndTime(sunday));      // 29.00
        ride.addSegment(10, new DateAndTime(sundayNight)); // 50.00
        expect(ride.finish()).toBe(120.1);
    });

    test("Min fare", (): void => {
        const ride = new Ride(fareCalculatorFactory);
        ride.addSegment(1, new DateAndTime(normalDay));
        expect(ride.finish()).toBe(10);
    });

});
```


