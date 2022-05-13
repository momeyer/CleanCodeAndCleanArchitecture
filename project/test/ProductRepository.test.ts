import { ProductRepository } from "../src/domain/ProductRepository";
import { NonPersistentProductRepository } from "../src/NonPersistentProductRepository";
import { camera } from "./ProductSamples";

describe("Non Persistent Product repository", (): void => {
    let repository: ProductRepository = new NonPersistentProductRepository();

    beforeEach((): void => {
        repository = new NonPersistentProductRepository();
    });

    test("invalid product", (): void => {
        expect(repository.isValidProductId({ value: 10 })).toBeFalsy();
    });

    test("valid product", (): void => {
        repository?.add(camera, 1);
        expect(repository.isValidProductId(camera.id)).toBeTruthy();
    });

    test("add existing product should incrise product quantity", (): void => {
        expect(repository.add(camera, 1)).toBeTruthy();
        expect(repository.add(camera, 1)).toBeTruthy();
        expect(repository?.find(camera.id)?.quantity).toBe(2);
    });

    test("add product", (): void => {
        expect(repository.add(camera, 3)).toBeTruthy();
        expect(repository.find(camera.id)?.quantity).toBe(3);
    });

    test("cannot find product", (): void => {
        expect(repository.find(camera.id)).toBeUndefined();
    });

    test("find existing product", (): void => {
        repository?.add(camera, 1);
        expect(repository.find(camera.id)?.product).toBe(camera);
        expect(repository.find(camera.id)?.quantity).toBe(1);
    });

    test("try to get invalid product", (): void => {
        expect(repository.remove({ value: 15 }, 1)).toBeFalsy();
    });

    test("get product product valid id and valid quantity", (): void => {
        repository?.add(camera, 5);
        repository?.remove(camera.id, 3);
        expect(repository.find(camera.id)?.quantity).toBe(2); // products left on repository
    });

    test("try to get invalid product quantity", (): void => {
        repository?.add(camera, 2);
        expect(repository.remove(camera.id, 3)).toBeFalsy();
    });
})