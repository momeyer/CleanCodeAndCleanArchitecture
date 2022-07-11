import { DBProductRepository } from "../src/DBProductRepository";
import { ProductRepository } from "../src/domain/repository/ProductRepository";
import MySqlPromiseConnectionAdapter from "../src/infra/database/MySqlPromiseConnectionAdapter";
import { NonPersistentProductRepository } from "../src/NonPersistentProductRepository";
import { camera, guitar, rubberDuck, tshirt } from "./ProductSamples";

describe("Non Persistent Product repository", (): void => {
    let repository: ProductRepository = new NonPersistentProductRepository();

    beforeEach((): void => {
        repository = new NonPersistentProductRepository();
    });

    test("invalid product", async (): Promise<void> => {
        const isValid = await repository.isValidProduct(10);
        expect(isValid).toBeFalsy();
    });

    test("valid product", async (): Promise<void> => {
        await repository?.add(camera, 1);
        const isValid = await repository.isValidProduct(camera.id);
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
        expect(product!.quantity).toBe(3);
    });

    test("cannot find product", async (): Promise<void> => {
        const product = await repository.find(15);
        expect(product).toBeUndefined();
    });

    test("find existing product", async (): Promise<void> => {
        await repository?.add(camera, 1);
        const product = await repository.find(camera.id);
        expect(product!.product).toBe(camera);
        expect(product!.quantity).toBe(1);
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


describe("DB Product repository", (): void => {
    let repository: ProductRepository = new DBProductRepository(new MySqlPromiseConnectionAdapter());

    beforeEach(async (): Promise<void> => {
        await repository.clear();
        await repository.add(camera, 100);
        await repository.add(guitar, 150);
        await repository.add(rubberDuck, 50);
        await repository.add(tshirt, 2);
    })
    test("find existing product", async (): Promise<void> => {
        const product = await repository.find(camera.id);
        expect(product!.quantity).toBe(100);
    });

    test("remove product product valid id and valid quantity", async (): Promise<void> => {
        const item = await repository.find(camera.id);
        await repository?.remove(camera.id, 3);
        const product = await repository.find(camera.id);
        expect(product?.quantity).toBe(item!.quantity - 3); // products left on repository
    });

    test("try to remove invalid product", async (): Promise<void> => {
        const output = await repository.remove(15, 1);
        expect(output).toBeFalsy()
    });

    test("try to remove invalid product quantity", async (): Promise<void> => {
        const output = await repository.remove(4, 3);
        expect(output).toBeFalsy()
    });

    test("should list products", async (): Promise<void> => {
        const output = await repository.list();
        expect(output.length).toBe(4)
        expect(output[0].product.description).toBe("Camera")
        expect(output[1].product.description).toBe("Guitar")
        expect(output[2].product.description).toBe("Rubber Duck")
        expect(output[3].product.description).toBe("tshirt")
    });

})


