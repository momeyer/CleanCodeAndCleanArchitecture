import { ProductRepository } from "../src/domain/repository/ProductRepository";
import MySqlPromiseConnectionAdapter from "../src/infra/database/MySqlPromiseConnectionAdapter";
import { DBProductRepository } from "../src/infra/repository/DBProductRepository";
import { NonPersistentProductRepository } from "../src/infra/repository/NonPersistentProductRepository";
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
    await repository?.add(camera);
    const isValid = await repository.isValidProduct(camera.id);
    expect(isValid).toBeTruthy();
  });

  test("add existing product should incrise product quantity", async (): Promise<void> => {
    await repository.add(camera);
    await repository.add(camera);
    const product = await repository.find(camera.id);
  });

  test("add product", async (): Promise<void> => {
    await repository.add(camera);
    const product = await repository.find(camera.id);
  });

  test("cannot find product", async (): Promise<void> => {
    const product = await repository.find(15);
    expect(product).toBeUndefined();
  });

  test("find existing product", async (): Promise<void> => {
    await repository?.add(camera);
    const product = await repository.find(camera.id);
    expect(product).toBe(camera);
  });

  test("should list products", async (): Promise<void> => {
    await repository?.add(camera);
    await repository?.add(guitar);
    const output = await repository.list();
    expect(output.length).toBe(2);
  });
});

describe.skip("DB Product repository", (): void => {
  const connection = new MySqlPromiseConnectionAdapter();
  let repository: ProductRepository = new DBProductRepository(connection);
  beforeAll(async (): Promise<void> => {
    await connection.connect();
  });

  beforeEach(async (): Promise<void> => {
    await repository.clear();
    await repository.add(camera);
    await repository.add(guitar);
    await repository.add(rubberDuck);
    await repository.add(tshirt);
  });

  afterEach(async () => {
    await repository.clear();
  });

  afterAll(async () => {
    await connection.close();
  });

  test("find existing product", async (): Promise<void> => {
    const product = await repository.find(camera.id);
    expect(product).toBeDefined();
  });

  test("remove product product valid id and valid quantity", async (): Promise<void> => {
    const item = await repository.find(camera.id);
    await repository?.remove(camera.id);
    const product = await repository.find(camera.id);
    expect(product).toBeDefined();
  });

  test("try to remove invalid product", async (): Promise<void> => {
    const output = await repository.remove(15);
    expect(output).toBeFalsy();
  });

  test("try to remove invalid product", async (): Promise<void> => {
    const output = await repository.remove(4);
    expect(output).toBeFalsy();
  });

  test("should list products", async (): Promise<void> => {
    const output = await repository.list();
    expect(output.length).toBe(4);

    expect(output[0].description).toBe("Camera");
    expect(output[1].description).toBe("Guitar");
    expect(output[2].description).toBe("Rubber_Duck");
    expect(output[3].description).toBe("tshirt");
  });
});
