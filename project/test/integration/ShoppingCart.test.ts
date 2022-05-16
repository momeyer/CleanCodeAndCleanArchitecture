import { DiscountCode } from "../../src/domain/DiscountCode";
import { NonPersistenDiscountCodeRepository } from "../../src/NonPersistentDiscountCodeRepository";
import { NonPersistentProductRepository } from "../../src/NonPersistentProductRepository";
import { ShoppingCartUseCases } from "../../src/useCases/ShoppingCartUseCases";
import { camera, guitar, rubberDuck } from "../ProductSamples";

describe("ShoppingCart Use Cases", (): void => {
    let productRepository = new NonPersistentProductRepository();
    let discountCodeRepository = new NonPersistenDiscountCodeRepository();

    beforeEach(async (): Promise<void> => {
        productRepository = new NonPersistentProductRepository();
        await productRepository.add(camera, 10);
        await productRepository.add(guitar, 10);
        await productRepository.add(rubberDuck, 10);
        discountCodeRepository = new NonPersistenDiscountCodeRepository();

    })

    test("Should get content from empty cart", async (): Promise<void> => {
        const shoppingCartUseCases = new ShoppingCartUseCases(productRepository, discountCodeRepository);
        const output = shoppingCartUseCases.getContent();

        expect(output.length).toBe(0)
    })

    test("Should get content from cart", async (): Promise<void> => {

        const shoppingCartUseCases = new ShoppingCartUseCases(productRepository, discountCodeRepository);
        const added = await shoppingCartUseCases.addItem({ productId: 1, quantity: 1 });
        expect(added).toBeTruthy();
        const output = shoppingCartUseCases.getContent();
        expect(output.length).toBe(1)
    })

    test("Should get content from cart with more than one item", async (): Promise<void> => {
        const shoppingCartUseCases = new ShoppingCartUseCases(productRepository, discountCodeRepository);

        await shoppingCartUseCases.addItem({ productId: 1, quantity: 1 });
        await shoppingCartUseCases.addItem({ productId: 2, quantity: 3 });
        const output = shoppingCartUseCases.getContent();
        expect(output.length).toBe(2)
    })

    test("Should fail to add invalid item", async (): Promise<void> => {
        const shoppingCartUseCases = new ShoppingCartUseCases(productRepository, discountCodeRepository);
        const added = await shoppingCartUseCases.addItem({ productId: 400, quantity: 1 });
        expect(added).toBeFalsy();
        const output = shoppingCartUseCases.getContent();
        expect(output.length).toBe(0)
    })

    test("Should fail to add invalid quantity item", async (): Promise<void> => {
        const shoppingCartUseCases = new ShoppingCartUseCases(productRepository, discountCodeRepository);
        expect(await shoppingCartUseCases.addItem({ productId: 1, quantity: 0 })).toBeFalsy();
        expect(await shoppingCartUseCases.addItem({ productId: 1, quantity: -1 })).toBeFalsy();
        const output = shoppingCartUseCases.getContent();
        expect(output.length).toBe(0)
    })

    test("Should fail to add more items than available in stock", async (): Promise<void> => {
        const shoppingCartUseCases = new ShoppingCartUseCases(productRepository, discountCodeRepository);
        expect(await shoppingCartUseCases.addItem({ productId: 1, quantity: 11 })).toBeFalsy();
        const output = shoppingCartUseCases.getContent();
        expect(output.length).toBe(0)
    })

    test("Should fail to remove non-existenting item", async (): Promise<void> => {
        const shoppingCartUseCases = new ShoppingCartUseCases(productRepository, discountCodeRepository);
        const removed = shoppingCartUseCases.removeItem(400);
        expect(removed).toBeFalsy();
        const output = shoppingCartUseCases.getContent();
        expect(output.length).toBe(0)
    })

    test("Should fail to remove existenting item", async (): Promise<void> => {
        const shoppingCartUseCases = new ShoppingCartUseCases(productRepository, discountCodeRepository);
        await shoppingCartUseCases.addItem({ productId: 2, quantity: 3 });
        const removed = shoppingCartUseCases.removeItem(2);
        expect(removed).toBeTruthy();
        const output = shoppingCartUseCases.getContent();
        expect(output.length).toBe(0)
    })


    test("Should clear shopping cart", async (): Promise<void> => {
        const shoppingCartUseCases = new ShoppingCartUseCases(productRepository, discountCodeRepository);
        await shoppingCartUseCases.addItem({ productId: 1, quantity: 3 });
        await shoppingCartUseCases.addItem({ productId: 2, quantity: 3 });
        await shoppingCartUseCases.addItem({ productId: 3, quantity: 3 });
        shoppingCartUseCases.clear();
        const output = shoppingCartUseCases.getContent();
        expect(output.length).toBe(0)
    })

    test("Should return 0 when product isn't in the cart", async (): Promise<void> => {
        const shoppingCartUseCases = new ShoppingCartUseCases(productRepository, discountCodeRepository);
        const output = shoppingCartUseCases.getItemQuantity(1);
        expect(output).toBe(0)
    })

    test("Should return item quantity", async (): Promise<void> => {
        const shoppingCartUseCases = new ShoppingCartUseCases(productRepository, discountCodeRepository);
        await shoppingCartUseCases.addItem({ productId: 1, quantity: 3 });
        const output = shoppingCartUseCases.getItemQuantity(1);
        expect(output).toBe(3)
    })

    test("Should fail apply invalid discount code to shopping cart", async (): Promise<void> => {
        const shoppingCartUseCases = new ShoppingCartUseCases(productRepository, discountCodeRepository);
        await shoppingCartUseCases.addItem({ productId: 1, quantity: 3 });
        const output = await shoppingCartUseCases.applyDiscountCode("Vale100", new Date("2021-01-01"));
        expect(output).toBeFalsy();
    })

    test("Should fail apply expired discount code to shopping cart", async (): Promise<void> => {
        const discountCode: DiscountCode = {
            code: "Vale20",
            amount: 0.20,
            expireDate: new Date("2021-01-01")
        }
        discountCodeRepository.addDiscountCode(discountCode);
        const shoppingCartUseCases = new ShoppingCartUseCases(productRepository, discountCodeRepository);
        await shoppingCartUseCases.addItem({ productId: 1, quantity: 3 });
        const output = await shoppingCartUseCases.applyDiscountCode("Vale20", new Date("2022-01-01"));
        expect(output).toBeFalsy();
    })

    test("Should apply discount code to shopping cart", async (): Promise<void> => {
        const discountCode: DiscountCode = {
            code: "Vale20",
            amount: 0.20,
            expireDate: new Date("2021-01-01")
        }
        discountCodeRepository.addDiscountCode(discountCode);
        const shoppingCartUseCases = new ShoppingCartUseCases(productRepository, discountCodeRepository);
        await shoppingCartUseCases.addItem({ productId: 1, quantity: 3 });
        const output = await shoppingCartUseCases.applyDiscountCode("Vale20", new Date("2020-01-01"));
        expect(output).toBeTruthy();
    })

    test("Should generate order summary from shipping cart without discount", async (): Promise<void> => {
        const shoppingCartUseCases = new ShoppingCartUseCases(productRepository, discountCodeRepository);
        await shoppingCartUseCases.addItem({ productId: 1, quantity: 1 });
        await shoppingCartUseCases.addItem({ productId: 2, quantity: 1 });
        const output = shoppingCartUseCases.generateSummary();
        expect(output.items.length).toBe(2);
        expect(output.shippingCost).toBe(40);
        expect(output.total).toBe(71.5);
    })


    test("Should generate order summary from shipping cart with discount", async (): Promise<void> => {
        const discountCode: DiscountCode = {
            code: "Vale20",
            amount: 0.20,
            expireDate: new Date("2021-01-01")
        }
        discountCodeRepository.addDiscountCode(discountCode);
        const shoppingCartUseCases = new ShoppingCartUseCases(productRepository, discountCodeRepository);
        await shoppingCartUseCases.addItem({ productId: 1, quantity: 1 });
        await shoppingCartUseCases.addItem({ productId: 2, quantity: 1 });
        const hasDiscount = await shoppingCartUseCases.applyDiscountCode("Vale20", new Date("2020-01-01"));
        expect(hasDiscount).toBeTruthy();
        const output = shoppingCartUseCases.generateSummary();
        expect(output.shippingCost).toBe(40);
        expect(output.total).toBe(65.2);
    })

})