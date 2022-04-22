import { FareCalculator } from "./FareCalculator";


export default class OvernightSundayFareCalculator implements FareCalculator {
    FARE = 5.0;

    calculate(dist: number): number {
        return dist * this.FARE;
    }
}
