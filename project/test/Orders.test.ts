import { Order, OrderItem, OrderStatus } from "../src/domain/entity/Order";
import { Product } from "../src/domain/entity/Product";
import { NonPersistentOrdersRepository } from "../src/NonPersistentOrdersRepository";
import { camera } from "./ProductSamples";

describe("Order Repository test", () => {

    const cpf = "111.444.777-35";
    let orders = new NonPersistentOrdersRepository();
    let product: Product = camera;
    let item: OrderItem = {
        productId: product.id,
        productDetails: product.physicalAttributes,
        price: product.price,
        quantity: 2,
    }
    let items: OrderItem[] = [item];
    let id: string = "202200000001";

    beforeEach(() => {
        orders = new NonPersistentOrdersRepository();
    })

    test("order should persist", (): void => {
        let newOrder = new Order(cpf, id);
        expect(orders.add(newOrder)).resolves.toBeTruthy();
    })

    test("order should update order status", async (): Promise<void> => {
        let newOrder = new Order(cpf, id);
        let output = await orders.add(newOrder);
        expect(output).toBeTruthy();

        let order = await orders.getOrder(id);
        expect(order?.status).toBe(OrderStatus.PENDING);
        expect(orders.updateStatus(id, OrderStatus.CONFIRMED)).resolves.toBeTruthy();
        order = await orders.getOrder(id);
        expect(order?.status).toBe(OrderStatus.CONFIRMED);
    })
})