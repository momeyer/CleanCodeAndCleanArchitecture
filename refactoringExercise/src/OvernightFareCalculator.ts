import { FareCalculator } from "./FareCalculator";



export default class OvernightFareCalculator implements FareCalculator {
    FARE = 3.9;

    calculate(dist: number): number {
        return dist * this.FARE;
    }
}
