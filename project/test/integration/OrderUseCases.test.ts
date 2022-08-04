import { Order, OrderStatus } from "../../src/domain/entity/Order";
import { OrderIdGenerator } from "../../src/domain/entity/OrderIdGenerator";
import ShoppingCart from "../../src/domain/entity/ShoppingCart";
import { ShoppingCartIdGenerator } from "../../src/domain/entity/ShoppingCartIdGenerator";
import MySqlPromiseConnectionAdapter from "../../src/infra/database/MySqlPromiseConnectionAdapter";
import DBOrdersRepository from "../../src/infra/repository/DBOrdersRepository";
import { DBProductRepository } from "../../src/infra/repository/DBProductRepository";
import DBStockEntryRepository from "../../src/infra/repository/DBStockEntryRepository";
import { NonPersistentOrdersRepository } from "../../src/infra/repository/NonPersistentOrdersRepository";
import { NonPersistentProductRepository } from "../../src/infra/repository/NonPersistentProductRepository";
import { NonPersistentShoppingCartRepository } from "../../src/infra/repository/NonPersistentShoppingCartRepository";
import NonPersistentStockEntryRepository from "../../src/infra/repository/NonPersistentStockEntryRepository";
import { OrderUseCases } from "../../src/useCases/OrderUseCases";
import { GetStock } from "../../src/useCases/Stock";
import { camera, guitar, rubberDuck } from "../ProductSamples";

describe("Order Use Cases", (): void => {
  const validCPF = "111.444.777-35";
  const invalidCPF = "111";

  let productRepository = new NonPersistentProductRepository();
  let stockRepository = new NonPersistentStockEntryRepository();
  let ordersRepository = new NonPersistentOrdersRepository();
  let orderIdGenerator = new OrderIdGenerator(0);
  let shoppingCartRepository = new NonPersistentShoppingCartRepository();
  let shoppinCartIdGenerator = new ShoppingCartIdGenerator(0);
  let orderUseCases = new OrderUseCases(
    ordersRepository,
    productRepository,
    stockRepository,
    orderIdGenerator,
    shoppingCartRepository
  );
  let shoppingCart = new ShoppingCart(shoppinCartIdGenerator.generate());

  beforeEach(async (): Promise<void> => {
    productRepository = new NonPersistentProductRepository();
    ordersRepository = new NonPersistentOrdersRepository();
    orderIdGenerator = new OrderIdGenerator(0);
    shoppingCartRepository = new NonPersistentShoppingCartRepository();
    shoppinCartIdGenerator = new ShoppingCartIdGenerator(0);

    await productRepository.add(camera);
    await productRepository.add(guitar);
    await productRepository.add(rubberDuck);
    orderUseCases = new OrderUseCases(
      ordersRepository,
      productRepository,
      stockRepository,
      orderIdGenerator,
      shoppingCartRepository
    );
    shoppingCart = new ShoppingCart(shoppinCartIdGenerator.generate());
    await stockRepository.clear();
  });

  describe("place order", (): void => {
    test("should fail to place empty order", async (): Promise<void> => {
      const output = await orderUseCases.place({ id: shoppingCart.id, cpf: validCPF, date: new Date("2021-01-01") });
      expect(output.date?.toDateString()).toBe(new Date("2021-01-01T00:00:00.000Z").toDateString());
      expect(output.message).toBe("Empty order");
      expect(output.status).toBe("INVALID");
    });

    test("should fail to place order with invalid cpf", async (): Promise<void> => {
      shoppingCart.addItem(camera, 1);
      shoppingCart.addItem(guitar, 1);
      shoppingCartRepository.add(shoppingCart);

      const output = await orderUseCases.place({ id: shoppingCart.id, cpf: invalidCPF, date: new Date("2021-01-01") });
      expect(output.date?.toDateString()).toBe(new Date("2021-01-01T00:00:00.000Z").toDateString());
      expect(output.message).toBe("Invalid CPF");
      expect(output.status).toBe("INVALID");
    });

    test("should decrese items quantity in repository", async (): Promise<void> => {
      shoppingCart.addItem(camera, 5);
      shoppingCart.addItem(guitar, 10);
      shoppingCartRepository.add(shoppingCart);

      const output = await orderUseCases.place({ id: shoppingCart.id, cpf: validCPF, date: new Date("2021-01-01") });
      expect(output.date?.toDateString()).toBe(new Date("2021-01-01T00:00:00.000Z").toDateString());
      expect(output.id).toBe("202100000001");
      expect(output.status).toBe("PENDING");
      expect(ordersRepository.placeOrders.has(output.id!)).toBeTruthy();

      const getStock = new GetStock(stockRepository);
      const cameraStock = await getStock.execute(camera.id);
      const guitarStock = await getStock.execute(guitar.id);
      expect(cameraStock.total).toBe(-5);
      expect(guitarStock.total).toBe(-10);
    });
  });

  describe("cancel order", (): void => {
    test("should fail to cancel non-existing order", async (): Promise<void> => {
      const output = await orderUseCases.cancel("invalidId");
      expect(output).toBeFalsy();
    });

    test("should fail to cancel compleated order", async (): Promise<void> => {
      await ordersRepository.add(new Order(validCPF, "202100000001", undefined, new Date("2021-01-01")));
      ordersRepository.updateStatus("202100000001", OrderStatus.COMPLETE);
      const output = await orderUseCases.cancel("202100000001");
      expect(output).toBeFalsy();
    });

    test("should fail to cancel canceled order", async (): Promise<void> => {
      await ordersRepository.add(new Order(validCPF, "202100000001", undefined, new Date("2021-01-01")));
      ordersRepository.updateStatus("202100000001", OrderStatus.CANCELLED);
      const output = await orderUseCases.cancel("202100000001");
      expect(output).toBeFalsy();
    });

    test("should cancel pending order", async (): Promise<void> => {
      await ordersRepository.add(new Order(validCPF, "202100000001", undefined, new Date("2021-01-01")));
      const output = await orderUseCases.cancel("202100000001");
      expect(output).toBeTruthy();
      const order = await ordersRepository.get("202100000001");
      expect(order?.status).toBe(OrderStatus.CANCELLED);
    });

    test("should cancel pending order and return items to repository", async (): Promise<void> => {
      shoppingCart.addItem(camera, 5);
      shoppingCart.addItem(guitar, 10);
      shoppingCartRepository.add(shoppingCart);
      const wasPlaces = await orderUseCases.place({ id: shoppingCart.id, cpf: validCPF, date: new Date("2021-01-01") });
      const output = await orderUseCases.cancel("202100000001");
      expect(output).toBeTruthy();
      const order = await ordersRepository.get("202100000001");
      expect(order?.status).toBe(OrderStatus.CANCELLED);
      const updatedCamera = await productRepository.find(camera.id);
      const updatedGuitar = await productRepository.find(guitar.id);
      // expect(updatedCamera?.quantity).toBe(100); TODO send EVENT
      // expect(updatedGuitar?.quantity).toBe(100); TODO send EVENT
    });
  });

  describe("search order", (): void => {
    test("should fail to find non-existing order", async (): Promise<void> => {
      const output = await orderUseCases.search("202100000001");
      expect(output).toBeUndefined();
    });

    test("should return order", async (): Promise<void> => {
      await ordersRepository.add(new Order(validCPF, "202100000001", undefined, new Date("2021-01-01")));
      const output = await orderUseCases.search("202100000001");
      expect(output?.id).toBe("202100000001");
      expect(output?.status).toBe("PENDING");
    });
  });
});

describe.skip("DB Order Use Cases", (): void => {
  const validCPF = "111.444.777-35";
  const invalidCPF = "111";

  const connection = new MySqlPromiseConnectionAdapter();
  let productRepository = new DBProductRepository(connection);
  let stockRepository = new DBStockEntryRepository(connection);
  let ordersRepository = new DBOrdersRepository(connection);
  let orderIdGenerator = new OrderIdGenerator(1);
  let shoppingCartRepository = new NonPersistentShoppingCartRepository();
  let shoppinCartIdGenerator = new ShoppingCartIdGenerator(0);
  let orderUseCases = new OrderUseCases(
    ordersRepository,
    productRepository,
    stockRepository,
    orderIdGenerator,
    shoppingCartRepository
  );
  let shoppingCart = new ShoppingCart(shoppinCartIdGenerator.generate());

  orderIdGenerator = new OrderIdGenerator(0);
  shoppingCartRepository = new NonPersistentShoppingCartRepository();
  shoppinCartIdGenerator = new ShoppingCartIdGenerator(0);

  orderUseCases = new OrderUseCases(
    ordersRepository,
    productRepository,
    stockRepository,
    orderIdGenerator,
    shoppingCartRepository
  );
  shoppingCart = new ShoppingCart(shoppinCartIdGenerator.generate());
  describe("place order", (): void => {
    beforeAll(async () => {
      await connection.connect();
    });

    test("should fail to place empty order", async (): Promise<void> => {
      const output = await orderUseCases.place({ id: shoppingCart.id, cpf: validCPF, date: new Date("2021-01-01") });
      expect(output.date?.toDateString()).toBe(new Date("2021-01-01T00:00:00.000Z").toDateString());
      expect(output.message).toBe("Empty order");
      expect(output.status).toBe("INVALID");
      await ordersRepository.clear();
    });

    test("should place an order", async (): Promise<void> => {
      shoppingCart.addItem(guitar, 10);
      shoppingCart.addItem(camera, 5);
      shoppingCartRepository.add(shoppingCart);
      const output = await orderUseCases.place({ id: shoppingCart.id, cpf: validCPF, date: new Date("2021-01-01") });
      expect(output.date?.toDateString()).toBe(new Date("2021-01-01T00:00:00.000Z").toDateString());
      expect(output.id).toBe("202100000001");
      expect(output.status).toBe("PENDING");
      expect(JSON.parse(output.items!)).toStrictEqual([
        {
          price: 20,
          productDetails: { depth_cm: 10, height_cm: 100, weight_kg: 3, width_cm: 30 },
          productId: 2,
          quantity: 10,
        },
        {
          price: 10,
          productDetails: { depth_cm: 10, height_cm: 20, weight_kg: 1, width_cm: 15 },
          productId: 1,
          quantity: 5,
        },
      ]);

      await ordersRepository.clear();
    });
    afterAll(async function () {
      jest.setTimeout(5 * 1000);
      await connection.close();
    });
  });
});
