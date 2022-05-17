import { NonPersistentProductRepository } from "../../src/NonPersistentProductRepository";
import { ProductUseCases } from "../../src/useCases/ProductUseCases";
import { camera, guitar } from "../ProductSamples";

describe("Product Use Cases", (): void => {
    test("Should add valid product", async (): Promise<void> => {
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

    test("Should fail to add product with invalid dimensions", async (): Promise<void> => {
        const productRepository = new NonPersistentProductRepository()
        const productUseCases = new ProductUseCases(productRepository);

        const input = {
            description: camera.description,
            height: -1,
            width: camera.dimensionsAndWeight.width_cm,
            depth: camera.dimensionsAndWeight.depth_cm,
            weight: camera.dimensionsAndWeight.weight_kg,
            price: camera.price,
            quantity: 1
        }

        expect(productUseCases.add(input)).resolves.toBeFalsy();
    })


    test("Should return empty list when empty", async (): Promise<void> => {
        const productRepository = new NonPersistentProductRepository()
        const productUseCases = new ProductUseCases(productRepository);

        const output = await productUseCases.list();
        expect(output.list).toHaveLength(0);
    })

    test("Should list all Products", async (): Promise<void> => {
        const productRepository = new NonPersistentProductRepository()
        const productUseCases = new ProductUseCases(productRepository);

        const cameraInput = {
            description: camera.description,
            height: camera.dimensionsAndWeight.height_cm,
            width: camera.dimensionsAndWeight.width_cm,
            depth: camera.dimensionsAndWeight.depth_cm,
            weight: camera.dimensionsAndWeight.weight_kg,
            price: camera.price,
            quantity: 100
        }

        const guitarInput = {
            description: guitar.description,
            height: guitar.dimensionsAndWeight.height_cm,
            width: guitar.dimensionsAndWeight.width_cm,
            depth: guitar.dimensionsAndWeight.depth_cm,
            weight: guitar.dimensionsAndWeight.weight_kg,
            price: guitar.price,
            quantity: 100
        }

        await productUseCases.add(cameraInput);
        await productUseCases.add(guitarInput);

        const output = await productUseCases.list();
        expect(output.list).toHaveLength(2);
    })

    test("Should return undefined when product doesnt exist", async (): Promise<void> => {
        const productRepository = new NonPersistentProductRepository()
        const productUseCases = new ProductUseCases(productRepository);
        expect(await productUseCases.search({ id: 2 })).toBeUndefined();
    })

    test("Should return camera", async (): Promise<void> => {
        const productRepository = new NonPersistentProductRepository()
        const productUseCases = new ProductUseCases(productRepository);
        const cameraInput = {
            description: camera.description,
            height: camera.dimensionsAndWeight.height_cm,
            width: camera.dimensionsAndWeight.width_cm,
            depth: camera.dimensionsAndWeight.depth_cm,
            weight: camera.dimensionsAndWeight.weight_kg,
            price: camera.price,
            quantity: 100
        }

        const guitarInput = {
            description: guitar.description,
            height: guitar.dimensionsAndWeight.height_cm,
            width: guitar.dimensionsAndWeight.width_cm,
            depth: guitar.dimensionsAndWeight.depth_cm,
            weight: guitar.dimensionsAndWeight.weight_kg,
            price: guitar.price,
            quantity: 100
        }
        await productUseCases.add(cameraInput);
        await productUseCases.add(guitarInput);

        const output = await productUseCases.search({ id: 1 });
        expect(output?.description).toBe(camera.description);
        expect(output?.price).toBe(camera.price);
    })

    test("Should delete camera", async (): Promise<void> => {
        const productRepository = new NonPersistentProductRepository()
        const productUseCases = new ProductUseCases(productRepository);
        const cameraInput = {
            description: camera.description,
            height: camera.dimensionsAndWeight.height_cm,
            width: camera.dimensionsAndWeight.width_cm,
            depth: camera.dimensionsAndWeight.depth_cm,
            weight: camera.dimensionsAndWeight.weight_kg,
            price: camera.price,
            quantity: 100
        }

        const guitarInput = {
            description: guitar.description,
            height: guitar.dimensionsAndWeight.height_cm,
            width: guitar.dimensionsAndWeight.width_cm,
            depth: guitar.dimensionsAndWeight.depth_cm,
            weight: guitar.dimensionsAndWeight.weight_kg,
            price: guitar.price,
            quantity: 100
        }
        await productUseCases.add(cameraInput);
        await productUseCases.add(guitarInput);


        const output = await productUseCases.remove({ id: 1, quantity: 100 });
        expect(output).toBeTruthy();
        const item = await productUseCases.search({ id: 1 });
        expect(item?.inStock).toBe(0);
    })

    test("Should return false when product is 0", async (): Promise<void> => {
        const productRepository = new NonPersistentProductRepository()
        const productUseCases = new ProductUseCases(productRepository);
        const cameraInput = {
            description: camera.description,
            height: camera.dimensionsAndWeight.height_cm,
            width: camera.dimensionsAndWeight.width_cm,
            depth: camera.dimensionsAndWeight.depth_cm,
            weight: camera.dimensionsAndWeight.weight_kg,
            price: camera.price,
            quantity: 100
        }

        const guitarInput = {
            description: guitar.description,
            height: guitar.dimensionsAndWeight.height_cm,
            width: guitar.dimensionsAndWeight.width_cm,
            depth: guitar.dimensionsAndWeight.depth_cm,
            weight: guitar.dimensionsAndWeight.weight_kg,
            price: guitar.price,
            quantity: 100
        }
        await productUseCases.add(cameraInput);
        await productUseCases.add(guitarInput);


        await productUseCases.remove({ id: 1, quantity: 100 });
        const output = await productUseCases.remove({ id: 1, quantity: 1 });
        expect(output).toBeFalsy();
    })
})
