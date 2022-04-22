import { FareCalculator } from "./FareCalculator";


export default class NormalFareCalculator implements FareCalculator {
    FARE = 2.10;

    calculate(dist: number): number {
        return dist * this.FARE;
    }
}
