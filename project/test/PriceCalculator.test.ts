import PriceCalculator from "../src/domain/entity/PriceCalculator";

describe("PriceCalculator test", (): void => {
    let priceCalculator = new PriceCalculator();

    beforeEach((): void => {
        priceCalculator = new PriceCalculator();
    })

    test("Should return 0 on empty list", (): void => {
        expect(priceCalculator.calculate()).toBe(0);
    })

    test("Should return 10.50", (): void => {
        priceCalculator.add(10, 1);
        expect(priceCalculator.calculate()).toBe(10.50);
    })

    test("Should return 21.00", (): void => {
        priceCalculator.add(10, 2);
        expect(priceCalculator.calculate()).toBe(21);
    })

    test("Should return 42.00", (): void => {
        priceCalculator.add(10, 2);
        priceCalculator.add(5, 4);
        expect(priceCalculator.calculate()).toBe(42);
    })

})