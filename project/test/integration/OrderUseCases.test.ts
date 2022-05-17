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

    const productRepository = new NonPersistentProductRepository()
    const ordersRepository = new NonPersistentOrdersRepository()
    const orderIdGenerator = new OrderIdGenerator(ordersRepository.placeOrders.size);
    const shoppingCartRepository = new NonPersistentShoppingCartRepository();
    const shoppinCartIdGenerator = new ShoppingCartIdGenerator(0);

    beforeEach(async (): Promise<void> => {
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
            expect(1).toBe(1);
        })
    })

    describe("search order", (): void => {

        test("search", (): void => {
            expect(1).toBe(1);
        })
    })

    describe("update status", (): void => {

        test("update", (): void => {
            expect(1).toBe(1);
        })
    })
})
