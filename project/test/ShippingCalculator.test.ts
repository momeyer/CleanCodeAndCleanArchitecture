import { ShippingCalculator } from "../src/domain/entity/ShippingCalculator";
import { camera, guitar, rubberDuck } from "./ProductSamples";

describe("Shipping Calculator", (): void => {
    let shippingCalculator: ShippingCalculator = new ShippingCalculator();

    beforeEach((): void => {
        shippingCalculator = new ShippingCalculator();
    });


    test("Should return 0 if no product", (): void => {
        expect(shippingCalculator.calculate()).toBe(0);
    });

    test("Should return 30 for one guitar", (): void => {
        shippingCalculator.addProductDetails(guitar.dimensionsAndWeight, 1);
        expect(shippingCalculator.calculate()).toBe(30);
    });

    test("Should return 60 for two guitars", (): void => {
        shippingCalculator.addProductDetails(guitar.dimensionsAndWeight, 2);
        expect(shippingCalculator.calculate()).toBe(60);
    });

    test("Should return minimum if shipping cost is lower than that", (): void => {
        shippingCalculator.addProductDetails(rubberDuck.dimensionsAndWeight, 1);
        expect(shippingCalculator.calculate()).toBe(10);
    });

    test("Should calcuate shipping cost for 2 different items", (): void => {
        shippingCalculator.addProductDetails(camera.dimensionsAndWeight, 1);
        shippingCalculator.addProductDetails(guitar.dimensionsAndWeight, 1);
        expect(shippingCalculator.calculate()).toBe(40);
    });

    test("Should calcuate shipping cost for 2 different items", (): void => {
        shippingCalculator.addProductDetails(camera.dimensionsAndWeight, 2);
        shippingCalculator.addProductDetails(guitar.dimensionsAndWeight, 1);
        expect(shippingCalculator.calculate()).toBe(50);
    });
});
