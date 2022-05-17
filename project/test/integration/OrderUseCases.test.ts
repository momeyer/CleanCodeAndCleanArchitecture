import ShoppingCart from "../../src/domain/entity/ShoppingCart";
import { NonPersistentProductRepository } from "../../src/NonPersistentProductRepository";
import { camera, guitar, rubberDuck } from "../ProductSamples";

describe("Order Use Cases", () => {

    const productRepository = new NonPersistentProductRepository()

    beforeEach(async () => {
        await productRepository.add(camera, 100);
        await productRepository.add(guitar, 100);
        await productRepository.add(rubberDuck, 100);
    })

    describe("place order", () => {
        test("place", () => {
            const shoppingCart = new ShoppingCart();
            expect(1).toBe(1);
        })
    })


    describe("cancel order", () => {

        test("cancel", () => {
            expect(1).toBe(1);
        })
    })

    describe("search order", () => {

        test("search", () => {
            expect(1).toBe(1);
        })
    })

    describe("update status", () => {

        test("update", () => {
            expect(1).toBe(1);
        })
    })
})