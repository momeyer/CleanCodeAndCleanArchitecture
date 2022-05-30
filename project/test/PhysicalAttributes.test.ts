import { PhysicalAttributes } from "../src/domain/entity/PhysicalAttributes";

describe("PhysicalAttributes test", (): void => {

    test("Should fail to have invalid dimension", (): void => {
        expect((): void => { new PhysicalAttributes(-10, 10, 10, 10) }).toThrow(new Error("Dimensions should always be bigger than 0"));
        expect((): void => { new PhysicalAttributes(10, -10, 10, 10) }).toThrow(new Error("Dimensions should always be bigger than 0"));
        expect((): void => { new PhysicalAttributes(10, 10, -10, 10) }).toThrow(new Error("Dimensions should always be bigger than 0"));
        expect((): void => { new PhysicalAttributes(10, 10, 10, -10) }).toThrow(new Error("Dimensions should always be bigger than 0"));
        expect((): void => { new PhysicalAttributes(-10, -10, -10, -10) }).toThrow(new Error("Dimensions should always be bigger than 0"));
    })
})