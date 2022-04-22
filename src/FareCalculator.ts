
function isOvernight(time: number): boolean {
    return (time >= 22 || time <= 6)
}

function isSunday(day: number): boolean {
    return (day === 0);
}


export interface FareCalculator {
    calculate(dist: number, date: Date): number;
};


export class NormalFareCalculator implements FareCalculator {
    FARE = 2.10;

    calculate(dist: number, date: Date): number {
        return dist * this.FARE;
    }
}

export class OvernightFareCalculator implements FareCalculator {
    FARE = 3.9;

    calculate(dist: number, date: Date): number {
        return dist * this.FARE;
    }
}

export class SundayFareCalculator implements FareCalculator {
    FARE = 2.9;

    calculate(dist: number, date: Date): number {
        return dist * this.FARE;
    }
}

export class OvernightSundayFareCalculator implements FareCalculator {
    FARE = 5.0;

    calculate(dist: number, date: Date): number {
        return dist * this.FARE;
    }
}


export class FareCalculatorFactory {
    nightFare = 3.90;
    sundayFare = 2.90;
    sundayNightFare = 5.0;

    create(dist: number, date: Date): FareCalculator {
        if (isOvernight(date.getHours()) && !isSunday(date.getDay())) {
            return new OvernightFareCalculator();
        }
        if (isOvernight(date.getHours()) && isSunday(date.getDay())) {
            return new OvernightSundayFareCalculator();
        }
        if (isSunday(date.getDay())) {
            return new SundayFareCalculator();
        }
        return new NormalFareCalculator();
    }
}
