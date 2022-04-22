import DateAndTime from "./DateAndTime";
import { FareCalculator } from "./FareCalculator";
import NormalFareCalculator from "./NormalFareCalculator";
import OvernightFareCalculator from "./OvernightFareCalculator";
import OvernightSundayFareCalculator from "./OvernightSundayFareCalculator";
import SundayFareCalculator from "./SundayFareCalculator";

export default class FareCalculatorFactory {
    create(date: DateAndTime): FareCalculator {
        if (date.isOvernight() && !date.isSunday()) {
            return new OvernightFareCalculator();
        }
        if (date.isOvernight() && date.isSunday()) {
            return new OvernightSundayFareCalculator();
        }
        if (date.isSunday()) {
            return new SundayFareCalculator();
        }
        return new NormalFareCalculator();
    }
}
