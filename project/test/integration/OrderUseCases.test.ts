import { OrderIdGenerator } from "../../src/domain/entity/OrderIdGenerator";
import ShoppingCart from "../../src/domain/entity/ShoppingCart";
import { ShoppingCartIdGenerator } from "../../src/domain/entity/ShoppingCartIdGenerator";
import { NonPersistentOrdersRepository } from "../../src/NonPersistentOrdersRepository";
import { NonPersistentProductRepository } from "../../src/NonPersistentProductRepository";
import { NonPersistentShoppingCartRepository } from "../../src/NonPersistentShoppingCartRepository";
import { OrderUseCases } from "../../src/useCases/OrderUseCases";
import { camera, guitar, rubberDuck } from "../ProductSamples";

describe("Order Use Cases", (): void => {
    const validCPF = "111.444.777-35";
    const invalidCPF = "111";

    let productRepository = new NonPersistentProductRepository()
    let ordersRepository = new NonPersistentOrdersRepository()
    let orderIdGenerator = new OrderIdGenerator(0);
    let shoppingCartRepository = new NonPersistentShoppingCartRepository();
    let shoppinCartIdGenerator = new ShoppingCartIdGenerator(0);

    beforeEach(async (): Promise<void> => {
        productRepository = new NonPersistentProductRepository()
        ordersRepository = new NonPersistentOrdersRepository()
        orderIdGenerator = new OrderIdGenerator(0);
        shoppingCartRepository = new NonPersistentShoppingCartRepository();
        shoppinCartIdGenerator = new ShoppingCartIdGenerator(0);

        await productRepository.add(camera, 100);
        await productRepository.add(guitar, 100);
        await productRepository.add(rubberDuck, 100);
    })

    describe("place order", (): void => {
        test("should fail to place empty order", async (): Promise<void> => {
            const orderUseCases = new OrderUseCases(ordersRepository, productRepository, orderIdGenerator, shoppingCartRepository);
            const shoppingCart = new ShoppingCart(shoppinCartIdGenerator.generate());

            const output = await orderUseCases.place({ id: shoppingCart.id, cpf: validCPF, date: new Date("2021-01-01") })
            expect(output.date?.toDateString()).toBe(new Date("2021-01-01T00:00:00.000Z").toDateString());
            expect(output.message).toBe("Empty order");
            expect(output.status).toBe("INVALID");
        })

        test("should fail to place order with invalid cpf", async (): Promise<void> => {
            const orderUseCases = new OrderUseCases(ordersRepository, productRepository, orderIdGenerator, shoppingCartRepository);
            const shoppingCart = new ShoppingCart(shoppinCartIdGenerator.generate());

            shoppingCart.addItem(camera, 1);
            shoppingCart.addItem(guitar, 1);
            shoppingCartRepository.add(shoppingCart);

            const output = await orderUseCases.place({ id: shoppingCart.id, cpf: invalidCPF, date: new Date("2021-01-01") })
            expect(output.date?.toDateString()).toBe(new Date("2021-01-01T00:00:00.000Z").toDateString());
            expect(output.message).toBe("Invalid CPF");
            expect(output.status).toBe("INVALID");
        })

        test("should place order", async (): Promise<void> => {
            const orderUseCases = new OrderUseCases(ordersRepository, productRepository, orderIdGenerator, shoppingCartRepository);
            const shoppingCart = new ShoppingCart(shoppinCartIdGenerator.generate());

            shoppingCart.addItem(camera, 1);
            shoppingCart.addItem(guitar, 1);
            shoppingCartRepository.add(shoppingCart);

            const output = await orderUseCases.place({ id: shoppingCart.id, cpf: validCPF, date: new Date("2021-01-01") })
            expect(output.date?.toDateString()).toBe(new Date("2021-01-01T00:00:00.000Z").toDateString());
            expect(output.id).toBe("202100000001")
            expect(output.status).toBe("PENDING");
            expect(ordersRepository.placeOrders.has(output.id!)).toBeTruthy();

        })
    })

    describe("cancel order", (): void => {

        test("cancel", (): void => {
            // if order doesnt exist
            // if order is compleated
            // if order is pendinding (should work)

            expect(1).toStrictEqual(1);
        })
    })

    describe("search order", (): void => {
        // if order doesnt exist
        // if order is pendinding (should work)
        test("search", (): void => {
            expect(1).toBe(1);
        })
    })

    describe("update status", (): void => {
        // if order doesnt exist
        // if order is compleated
        test("update", (): void => {
            expect(1).toBe(1);
        })
    })
})
