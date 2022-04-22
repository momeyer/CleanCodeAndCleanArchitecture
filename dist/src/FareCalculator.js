"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FareCalculatorFactory = exports.OvernightSundayFareCalculator = exports.SundayFareCalculator = exports.OvernightFareCalculator = exports.NormalFareCalculator = void 0;
function isOvernight(time) {
    return (time >= 22 || time <= 6);
}
function isSunday(day) {
    return (day === 0);
}
;
class NormalFareCalculator {
    constructor() {
        this.FARE = 2.10;
    }
    calculate(dist, date) {
        return dist * this.FARE;
    }
}
exports.NormalFareCalculator = NormalFareCalculator;
class OvernightFareCalculator {
    constructor() {
        this.FARE = 3.9;
    }
    calculate(dist, date) {
        return dist * this.FARE;
    }
}
exports.OvernightFareCalculator = OvernightFareCalculator;
class SundayFareCalculator {
    constructor() {
        this.FARE = 2.9;
    }
    calculate(dist, date) {
        return dist * this.FARE;
    }
}
exports.SundayFareCalculator = SundayFareCalculator;
class OvernightSundayFareCalculator {
    constructor() {
        this.FARE = 5.0;
    }
    calculate(dist, date) {
        return dist * this.FARE;
    }
}
exports.OvernightSundayFareCalculator = OvernightSundayFareCalculator;
class FareCalculatorFactory {
    constructor() {
        this.nightFare = 3.90;
        this.sundayFare = 2.90;
        this.sundayNightFare = 5.0;
    }
    create(dist, date) {
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
exports.FareCalculatorFactory = FareCalculatorFactory;
