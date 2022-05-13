import { NonPersistentProductRepository } from "../../src/NonPersistentProductRepository";
import { ShoppingCartUseCases } from "../../src/useCases/ShoppingCartUseCases";
import { camera, guitar, rubberDuck } from "../ProductSamples";

describe("ShoppingCart Use Cases", (): void => {

    test("Should get content from empty cart", async (): Promise<void> => {
        const productRepository = new NonPersistentProductRepository();
        const shoppingCartUseCases = new ShoppingCartUseCases(productRepository);
        const output = shoppingCartUseCases.getContent();

        expect(output.length).toBe(0)
    })

    test("Should get content from cart", async (): Promise<void> => {
        const productRepository = new NonPersistentProductRepository();
        await productRepository.add(camera, 10);
        await productRepository.add(guitar, 10);
        await productRepository.add(rubberDuck, 10);

        const shoppingCartUseCases = new ShoppingCartUseCases(productRepository);

        const added = await shoppingCartUseCases.addItem({ productId: 1, quantity: 1 });
        expect(added).toBeTruthy();
        const output = shoppingCartUseCases.getContent();
        expect(output.length).toBe(1)
    })
})