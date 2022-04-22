import { FareCalculator } from "./FareCalculator";


export default class SundayFareCalculator implements FareCalculator {
    FARE = 2.9;

    calculate(dist: number): number {
        return dist * this.FARE;
    }
}
