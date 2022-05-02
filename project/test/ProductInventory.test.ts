import { NonPersistentProductInventory, ProductInventory } from "../src/ProductInventory";

describe("Non Persistent Product Inventory", (): void => {
    let inventory: ProductInventory | undefined = undefined;
    const product1 = { id: { value: 1 }, price: 10 };

    beforeEach((): void => {
        inventory = new NonPersistentProductInventory();
    });

    test("invalid product", (): void => {
        expect(inventory!.isValidProductId({ value: 10 })).toBeFalsy();
    });

    test("valid product", (): void => {
        inventory?.addProduct(product1, 1);
        expect(inventory!.isValidProductId(product1.id)).toBeTruthy();
    });

    test("add existing product should incrise product quantity", (): void => {
        expect(inventory!.addProduct(product1, 1)).toBeTruthy();
        expect(inventory!.addProduct(product1, 1)).toBeTruthy();
        expect(inventory?.findProduct(product1.id)?.quantity).toBe(2);
    });

    test("add product", (): void => {
        expect(inventory!.addProduct(product1, 3)).toBeTruthy();
        expect(inventory!.findProduct(product1.id)?.quantity).toBe(3);
    });

    test("cannot find product", (): void => {
        expect(inventory!.findProduct(product1.id)).toBeUndefined();
    });

    test("find existing product", (): void => {
        inventory?.addProduct(product1, 1);
        expect(inventory!.findProduct(product1.id)?.product).toBe(product1);
        expect(inventory!.findProduct(product1.id)?.quantity).toBe(1);
    });

    test("try to get invalid product", (): void => {
        expect(inventory!.removeProduct({ value: 15 }, 1)).toBeFalsy();
    });

    test("get product product valid id and valid quantity", (): void => {
        inventory?.addProduct(product1, 5);
        inventory?.removeProduct(product1.id, 3);
        expect(inventory!.findProduct(product1.id)?.quantity).toBe(2); // products left on inventory
    });

    test("try to get invalid product quantity", (): void => {
        inventory?.addProduct(product1, 2);
        expect(inventory!.removeProduct(product1.id, 3)).toBeFalsy();
    });


})