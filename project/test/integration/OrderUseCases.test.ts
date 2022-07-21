import { Order, OrderStatus } from "../../src/domain/entity/Order";
import { OrderIdGenerator } from "../../src/domain/entity/OrderIdGenerator";
import ShoppingCart from "../../src/domain/entity/ShoppingCart";
import { ShoppingCartIdGenerator } from "../../src/domain/entity/ShoppingCartIdGenerator";
import MySqlPromiseConnectionAdapter from "../../src/infra/database/MySqlPromiseConnectionAdapter";
import DBOrdersRepository from "../../src/infra/repository/DBOrdersRepository";
import { DBProductRepository } from "../../src/infra/repository/DBProductRepository";
import { NonPersistentOrdersRepository } from "../../src/NonPersistentOrdersRepository";
import { NonPersistentProductRepository } from "../../src/NonPersistentProductRepository";
import { NonPersistentShoppingCartRepository } from "../../src/NonPersistentShoppingCartRepository";
import { OrderUseCases } from "../../src/useCases/OrderUseCases";
import { camera, guitar, rubberDuck } from "../ProductSamples";

describe("Order Use Cases", (): void => {
  const validCPF = "111.444.777-35";
  const invalidCPF = "111";

  let productRepository = new NonPersistentProductRepository();
  let ordersRepository = new NonPersistentOrdersRepository();
  let orderIdGenerator = new OrderIdGenerator(0);
  let shoppingCartRepository = new NonPersistentShoppingCartRepository();
  let shoppinCartIdGenerator = new ShoppingCartIdGenerator(0);
  let orderUseCases = new OrderUseCases(ordersRepository, productRepository, orderIdGenerator, shoppingCartRepository);
  let shoppingCart = new ShoppingCart(shoppinCartIdGenerator.generate());

  beforeEach(async (): Promise<void> => {
    productRepository = new NonPersistentProductRepository();
    ordersRepository = new NonPersistentOrdersRepository();
    orderIdGenerator = new OrderIdGenerator(0);
    shoppingCartRepository = new NonPersistentShoppingCartRepository();
    shoppinCartIdGenerator = new ShoppingCartIdGenerator(0);

    await productRepository.add(camera, 100);
    await productRepository.add(guitar, 100);
    await productRepository.add(rubberDuck, 100);
    orderUseCases = new OrderUseCases(ordersRepository, productRepository, orderIdGenerator, shoppingCartRepository);
    shoppingCart = new ShoppingCart(shoppinCartIdGenerator.generate());
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
      const updatedCamera = await productRepository.find(camera.id);
      const updatedGuitar = await productRepository.find(guitar.id);
      // expect(updatedCamera?.quantity).toBe(95); TODO send EVENT
      // expect(updatedGuitar?.quantity).toBe(90); TODO send EVENT
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

describe("DB Order Use Cases", (): void => {
  const validCPF = "111.444.777-35";
  const invalidCPF = "111";

  const connection = new MySqlPromiseConnectionAdapter();
  let productRepository = new DBProductRepository(connection);
  let ordersRepository = new DBOrdersRepository(connection);
  let orderIdGenerator = new OrderIdGenerator(1);
  let shoppingCartRepository = new NonPersistentShoppingCartRepository();
  let shoppinCartIdGenerator = new ShoppingCartIdGenerator(0);
  let orderUseCases = new OrderUseCases(ordersRepository, productRepository, orderIdGenerator, shoppingCartRepository);
  let shoppingCart = new ShoppingCart(shoppinCartIdGenerator.generate());

  orderIdGenerator = new OrderIdGenerator(0);
  shoppingCartRepository = new NonPersistentShoppingCartRepository();
  shoppinCartIdGenerator = new ShoppingCartIdGenerator(0);

  orderUseCases = new OrderUseCases(ordersRepository, productRepository, orderIdGenerator, shoppingCartRepository);
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
      await shoppingCart.addItem(guitar, 10);
      await shoppingCart.addItem(camera, 5);
      await shoppingCartRepository.add(shoppingCart);
      const output = await orderUseCases.place({ id: shoppingCart.id, cpf: validCPF, date: new Date("2021-01-01") });
      expect(output.date?.toDateString()).toBe(new Date("2021-01-01T00:00:00.000Z").toDateString());
      expect(output.id).toBe("202100000001");
      expect(output.status).toBe("PENDING");

      await ordersRepository.clear();
    });
    afterAll(async function () {
      jest.setTimeout(5 * 1000);
      await connection.close();
    });
  });
});
