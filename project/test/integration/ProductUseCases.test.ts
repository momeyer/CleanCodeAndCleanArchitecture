import { NonPersistentProductRepository } from "../../src/NonPersistentProductRepository";
import { ProductUseCases } from "../../src/useCases/ProductUseCases";
import { camera } from "../ProductSamples";

describe("Product Use Cases", (): void => {
    test("Should add valid product", (): void => {
        const productRepository = new NonPersistentProductRepository()
        const productUseCases = new ProductUseCases(productRepository);

        const input = {
            description: camera.description,
            height: camera.dimensionsAndWeight.height_cm,
            width: camera.dimensionsAndWeight.width_cm,
            depth: camera.dimensionsAndWeight.depth_cm,
            weight: camera.dimensionsAndWeight.weight_kg,
            price: camera.price,
            quantity: 1
        }

        expect(productUseCases.add(input)).resolves.toBeTruthy();
    })
})
