import MySqlPromiseConnectionAdapter from "../../src/infra/database/MySqlPromiseConnectionAdapter";
import { DBProductRepository } from "../../src/infra/repository/DBProductRepository";
import { NonPersistentProductRepository } from "../../src/NonPersistentProductRepository";
import { ProductUseCases } from "../../src/useCases/ProductUseCases";
import { camera, guitar } from "../ProductSamples";

describe("Product Use Cases", (): void => {
  describe("Add Use Cases", () => {
    test("Should add valid product", async (): Promise<void> => {
      const productRepository = new NonPersistentProductRepository();
      const productUseCases = new ProductUseCases(productRepository);

      const input = {
        description: camera.description,
        height: camera.physicalAttributes.height_cm,
        width: camera.physicalAttributes.width_cm,
        depth: camera.physicalAttributes.depth_cm,
        weight: camera.physicalAttributes.weight_kg,
        price: camera.price,
        quantity: 1,
      };

      expect(productUseCases.add(input)).resolves.toBeTruthy();
    });

    test("Should fail to add product with invalid dimensions", async (): Promise<void> => {
      const productRepository = new NonPersistentProductRepository();
      const productUseCases = new ProductUseCases(productRepository);

      const input = {
        description: camera.description,
        height: -1,
        width: camera.physicalAttributes.width_cm,
        depth: camera.physicalAttributes.depth_cm,
        weight: camera.physicalAttributes.weight_kg,
        price: camera.price,
        quantity: 1,
      };

      expect(productUseCases.add(input)).resolves.toBeFalsy();
    });
  });
  describe("List Use Cases", () => {
    const cameraInput = {
      description: camera.description,
      height: camera.physicalAttributes.height_cm,
      width: camera.physicalAttributes.width_cm,
      depth: camera.physicalAttributes.depth_cm,
      weight: camera.physicalAttributes.weight_kg,
      price: camera.price,
      quantity: 100,
    };

    const guitarInput = {
      description: guitar.description,
      height: guitar.physicalAttributes.height_cm,
      width: guitar.physicalAttributes.width_cm,
      depth: guitar.physicalAttributes.depth_cm,
      weight: guitar.physicalAttributes.weight_kg,
      price: guitar.price,
      quantity: 100,
    };

    test("Should return empty list when empty", async (): Promise<void> => {
      const productRepository = new NonPersistentProductRepository();
      const productUseCases = new ProductUseCases(productRepository);

      const output = await productUseCases.list();
      expect(output.list).toHaveLength(0);
    });

    test("Should list all Products", async (): Promise<void> => {
      const productRepository = new NonPersistentProductRepository();
      const productUseCases = new ProductUseCases(productRepository);

      await productUseCases.add(cameraInput);
      await productUseCases.add(guitarInput);

      const output = await productUseCases.list();
      expect(output.list).toHaveLength(2);
    });
  });

  describe("Search Use Cases", () => {
    const cameraInput = {
      description: camera.description,
      height: camera.physicalAttributes.height_cm,
      width: camera.physicalAttributes.width_cm,
      depth: camera.physicalAttributes.depth_cm,
      weight: camera.physicalAttributes.weight_kg,
      price: camera.price,
      quantity: 100,
    };

    const guitarInput = {
      description: guitar.description,
      height: guitar.physicalAttributes.height_cm,
      width: guitar.physicalAttributes.width_cm,
      depth: guitar.physicalAttributes.depth_cm,
      weight: guitar.physicalAttributes.weight_kg,
      price: guitar.price,
      quantity: 100,
    };

    test("Should return undefined when product doesnt exist", async (): Promise<void> => {
      const productRepository = new NonPersistentProductRepository();
      const productUseCases = new ProductUseCases(productRepository);
      expect(await productUseCases.search(2)).toBeUndefined();
    });

    test("Should return camera", async (): Promise<void> => {
      const productRepository = new NonPersistentProductRepository();
      const productUseCases = new ProductUseCases(productRepository);

      await productUseCases.add(cameraInput);
      await productUseCases.add(guitarInput);

      const output = await productUseCases.search(1);
      expect(output?.description).toBe(camera.description);
      expect(output?.price).toBe(camera.price);
    });
  });

  describe("Delete Use Cases", () => {
    const cameraInput = {
      description: camera.description,
      height: camera.physicalAttributes.height_cm,
      width: camera.physicalAttributes.width_cm,
      depth: camera.physicalAttributes.depth_cm,
      weight: camera.physicalAttributes.weight_kg,
      price: camera.price,
      quantity: 100,
    };

    const guitarInput = {
      description: guitar.description,
      height: guitar.physicalAttributes.height_cm,
      width: guitar.physicalAttributes.width_cm,
      depth: guitar.physicalAttributes.depth_cm,
      weight: guitar.physicalAttributes.weight_kg,
      price: guitar.price,
      quantity: 100,
    };

    test("Should delete camera", async (): Promise<void> => {
      const productRepository = new NonPersistentProductRepository();
      const productUseCases = new ProductUseCases(productRepository);

      await productUseCases.add(cameraInput);
      await productUseCases.add(guitarInput);

      const output = await productUseCases.remove({ id: 1, quantity: 100 });
      expect(output).toBeTruthy();
      const item = await productUseCases.search(1);
      expect(item?.inStock).toBe(0);
    });

    test("Should return false when product is 0", async (): Promise<void> => {
      const productRepository = new NonPersistentProductRepository();
      const productUseCases = new ProductUseCases(productRepository);

      await productUseCases.add(cameraInput);
      await productUseCases.add(guitarInput);

      await productUseCases.remove({ id: 1, quantity: 100 });
      const output = await productUseCases.remove({ id: 1, quantity: 1 });
      expect(output).toBeFalsy();
    });
  });
});

describe.skip("Product Use Cases DB", (): void => {
  describe("Add Use Cases", (): void => {
    test("Should add valid product", async (): Promise<void> => {
      const connection = new MySqlPromiseConnectionAdapter();
      const productRepository = new DBProductRepository(connection);
      await productRepository.clear();
      const productUseCases = new ProductUseCases(productRepository);
      const input = {
        description: camera.description,
        height: camera.physicalAttributes.height_cm,
        width: camera.physicalAttributes.width_cm,
        depth: camera.physicalAttributes.depth_cm,
        weight: camera.physicalAttributes.weight_kg,
        price: camera.price,
        quantity: 10,
      };
      const output = await productUseCases.add(input);
      expect(output).toBeTruthy();
      const find = await productUseCases.search(1);
      expect(find?.description).toBe(camera.description);
      expect(find?.inStock).toBe(10);
    });
    test("Should add valid product", async (): Promise<void> => {
      const connection = new MySqlPromiseConnectionAdapter();
      const productRepository = new DBProductRepository(connection);
      const productUseCases = new ProductUseCases(productRepository);
      await productRepository.clear();
      const input = {
        description: "hello",
        height: 1,
        width: 1,
        depth: 1,
        weight: 1,
        price: 1,
        quantity: 1,
      };
      const output = await productUseCases.add(input);
      expect(output).toBeTruthy();
      let find = await productUseCases.search(1);
      expect(find?.description).toBe("hello");
      expect(find?.inStock).toBe(1);
    });
    test("Should add more items to existing product", async (): Promise<void> => {
      const connection = new MySqlPromiseConnectionAdapter();
      const productRepository = new DBProductRepository(connection);
      await productRepository.clear();
      const productUseCases = new ProductUseCases(productRepository);
      const input = {
        description: camera.description,
        height: camera.physicalAttributes.height_cm,
        width: camera.physicalAttributes.width_cm,
        depth: camera.physicalAttributes.depth_cm,
        weight: camera.physicalAttributes.weight_kg,
        price: camera.price,
        quantity: 10,
      };
      let output = await productUseCases.add(input);
      expect(output).toBeTruthy();
      output = await productUseCases.add(input);
      const find = await productUseCases.search(1);
      expect(find?.description).toBe(camera.description);
      expect(find?.inStock).toBe(20);
    });
    test("Should fail to add product with invalid dimensions", async (): Promise<void> => {
      const productRepository = new NonPersistentProductRepository();
      const productUseCases = new ProductUseCases(productRepository);
      const input = {
        description: camera.description,
        height: -1,
        width: camera.physicalAttributes.width_cm,
        depth: camera.physicalAttributes.depth_cm,
        weight: camera.physicalAttributes.weight_kg,
        price: camera.price,
        quantity: 1,
      };
      expect(productUseCases.add(input)).resolves.toBeFalsy();
    });
  });

  describe("List Use Cases", () => {
    const cameraInput = {
      description: camera.description,
      height: camera.physicalAttributes.height_cm,
      width: camera.physicalAttributes.width_cm,
      depth: camera.physicalAttributes.depth_cm,
      weight: camera.physicalAttributes.weight_kg,
      price: camera.price,
      quantity: 100,
    };
    const guitarInput = {
      description: guitar.description,
      height: guitar.physicalAttributes.height_cm,
      width: guitar.physicalAttributes.width_cm,
      depth: guitar.physicalAttributes.depth_cm,
      weight: guitar.physicalAttributes.weight_kg,
      price: guitar.price,
      quantity: 100,
    };
    test("Should return empty list when empty", async (): Promise<void> => {
      const productRepository = new NonPersistentProductRepository();
      const productUseCases = new ProductUseCases(productRepository);
      const output = await productUseCases.list();
      expect(output.list).toHaveLength(0);
    });
    test("Should list all Products", async (): Promise<void> => {
      const productRepository = new NonPersistentProductRepository();
      const productUseCases = new ProductUseCases(productRepository);
      await productUseCases.add(cameraInput);
      await productUseCases.add(guitarInput);
      const output = await productUseCases.list();
      expect(output.list).toHaveLength(2);
    });
    // test("Should list all Products DATABASE", async (): Promise<void> => {
    //     const productRepository = new DatabaseProductRepository(new PgPromiseConnectionAdapter())
    //     const productUseCases = new ProductUseCases(productRepository);
    //     await productUseCases.add(cameraInput);
    //     await productUseCases.add(guitarInput);
    //     const output = await productUseCases.list();
    //     expect(output.list).toHaveLength(2);
    // })
  });
  describe("Search Use Cases", () => {
    const cameraInput = {
      description: camera.description,
      height: camera.physicalAttributes.height_cm,
      width: camera.physicalAttributes.width_cm,
      depth: camera.physicalAttributes.depth_cm,
      weight: camera.physicalAttributes.weight_kg,
      price: camera.price,
      quantity: 100,
    };
    const guitarInput = {
      description: guitar.description,
      height: guitar.physicalAttributes.height_cm,
      width: guitar.physicalAttributes.width_cm,
      depth: guitar.physicalAttributes.depth_cm,
      weight: guitar.physicalAttributes.weight_kg,
      price: guitar.price,
      quantity: 100,
    };
    test("Should return undefined when product doesnt exist", async (): Promise<void> => {
      const productRepository = new NonPersistentProductRepository();
      const productUseCases = new ProductUseCases(productRepository);
      expect(await productUseCases.search(2)).toBeUndefined();
    });
    test("Should return camera", async (): Promise<void> => {
      const productRepository = new NonPersistentProductRepository();
      const productUseCases = new ProductUseCases(productRepository);
      await productUseCases.add(cameraInput);
      await productUseCases.add(guitarInput);
      const output = await productUseCases.search(1);
      expect(output?.description).toBe(camera.description);
      expect(output?.price).toBe(camera.price);
    });
  });
  describe("Delete Use Cases", () => {
    const cameraInput = {
      description: camera.description,
      height: camera.physicalAttributes.height_cm,
      width: camera.physicalAttributes.width_cm,
      depth: camera.physicalAttributes.depth_cm,
      weight: camera.physicalAttributes.weight_kg,
      price: camera.price,
      quantity: 100,
    };
    const guitarInput = {
      description: guitar.description,
      height: guitar.physicalAttributes.height_cm,
      width: guitar.physicalAttributes.width_cm,
      depth: guitar.physicalAttributes.depth_cm,
      weight: guitar.physicalAttributes.weight_kg,
      price: guitar.price,
      quantity: 100,
    };
    test("Should delete camera", async (): Promise<void> => {
      const productRepository = new NonPersistentProductRepository();
      const productUseCases = new ProductUseCases(productRepository);
      await productUseCases.add(cameraInput);
      await productUseCases.add(guitarInput);
      const output = await productUseCases.remove({ id: 1, quantity: 100 });
      expect(output).toBeTruthy();
      const item = await productUseCases.search(1);
      expect(item?.inStock).toBe(0);
    });
    test("Should return false when product is 0", async (): Promise<void> => {
      const productRepository = new NonPersistentProductRepository();
      const productUseCases = new ProductUseCases(productRepository);
      await productUseCases.add(cameraInput);
      await productUseCases.add(guitarInput);
      await productUseCases.remove({ id: 1, quantity: 100 });
      const output = await productUseCases.remove({ id: 1, quantity: 1 });
      expect(output).toBeFalsy();
    });
  });
});
