import { ProductInventory } from "../src/domain/ProductInventory";
import { NonPersistentProductRepository } from "../src/NonPersistentProductRepository";
import { camera } from "./ProductSamples";

describe("Non Persistent Product Inventory", (): void => {
    let inventory: ProductInventory = new NonPersistentProductRepository();

    beforeEach((): void => {
        inventory = new NonPersistentProductRepository();
    });

    test("invalid product", (): void => {
        expect(inventory.isValidProductId({ value: 10 })).toBeFalsy();
    });

    test("valid product", (): void => {
        inventory?.addProduct(camera, 1);
        expect(inventory.isValidProductId(camera.id)).toBeTruthy();
    });

    test("add existing product should incrise product quantity", (): void => {
        expect(inventory.addProduct(camera, 1)).toBeTruthy();
        expect(inventory.addProduct(camera, 1)).toBeTruthy();
        expect(inventory?.findProduct(camera.id)?.quantity).toBe(2);
    });

    test("add product", (): void => {
        expect(inventory.addProduct(camera, 3)).toBeTruthy();
        expect(inventory.findProduct(camera.id)?.quantity).toBe(3);
    });

    test("cannot find product", (): void => {
        expect(inventory.findProduct(camera.id)).toBeUndefined();
    });

    test("find existing product", (): void => {
        inventory?.addProduct(camera, 1);
        expect(inventory.findProduct(camera.id)?.product).toBe(camera);
        expect(inventory.findProduct(camera.id)?.quantity).toBe(1);
    });

    test("try to get invalid product", (): void => {
        expect(inventory.removeProduct({ value: 15 }, 1)).toBeFalsy();
    });

    test("get product product valid id and valid quantity", (): void => {
        inventory?.addProduct(camera, 5);
        inventory?.removeProduct(camera.id, 3);
        expect(inventory.findProduct(camera.id)?.quantity).toBe(2); // products left on inventory
    });

    test("try to get invalid product quantity", (): void => {
        inventory?.addProduct(camera, 2);
        expect(inventory.removeProduct(camera.id, 3)).toBeFalsy();
    });
})