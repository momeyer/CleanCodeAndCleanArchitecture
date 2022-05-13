import { ProductRepository } from "../src/domain/ProductRepository";
import { NonPersistentProductRepository } from "../src/NonPersistentProductRepository";
import { camera, guitar } from "./ProductSamples";

describe("Non Persistent Product repository", (): void => {
    let repository: ProductRepository = new NonPersistentProductRepository();

    beforeEach((): void => {
        repository = new NonPersistentProductRepository();
    });

    test("invalid product", async (): Promise<void> => {
        const isValid = await repository.isValidProductId(10);
        expect(isValid).toBeFalsy();
    });

    test("valid product", async (): Promise<void> => {
        await repository?.add(camera, 1);
        const isValid = await repository.isValidProductId(camera.id);
        expect(isValid).toBeTruthy();
    });

    test("add existing product should incrise product quantity", async (): Promise<void> => {
        await repository.add(camera, 1);
        await repository.add(camera, 1);
        const product = await repository.find(camera.id);
        expect(product!.quantity).toBe(2);
    });

    test("add product", async (): Promise<void> => {
        await repository.add(camera, 3);
        const product = await repository.find(camera.id);
        expect(product?.quantity).toBe(3);
    });

    test("cannot find product", async (): Promise<void> => {
        const product = await repository.find(camera.id);
        expect(product).toBeUndefined();
    });

    test("find existing product", async (): Promise<void> => {
        await repository?.add(camera, 1);
        const product = await repository.find(camera.id);
        expect(product?.product).toBe(camera);
        expect(product?.quantity).toBe(1);
    });

    test("try to remove invalid product", async (): Promise<void> => {
        const output = await repository.remove(15, 1);
        expect(output).toBeFalsy()
    });

    test("remove product product valid id and valid quantity", async (): Promise<void> => {
        await repository?.add(camera, 5);
        await repository?.remove(camera.id, 3);
        const product = await repository.find(camera.id);
        expect(product?.quantity).toBe(2); // products left on repository
    });

    test("try to remove invalid product quantity", async (): Promise<void> => {
        await repository?.add(camera, 2);
        const output = await repository.remove(camera.id, 3);
        expect(output).toBeFalsy()
    });

    test("should list products", async (): Promise<void> => {
        await repository?.add(camera, 2);
        await repository?.add(guitar, 2);
        const output = await repository.list();
        expect(output.length).toBe(2)
    });
})