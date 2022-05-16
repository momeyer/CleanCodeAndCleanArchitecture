import { Order, OrderItem, OrderStatus } from "../src/domain/entity/Order";
import { OrderId } from "../src/domain/entity/OrderIdGenerator";
import { Product } from "../src/domain/entity/Product";
import { NonPersistentOrdersRepository } from "../src/NonPersistentOrdersRepository";
import { camera } from "./ProductSamples";

const cpf = "111.444.777-35";

test("order should persist", (): void => {
    const orders = new NonPersistentOrdersRepository();
    let product: Product = camera;
    let item: OrderItem = {
        productId: product.id,
        productDetails: product.dimensionsAndWeight,
        price: product.price,
        quantity: 2,
    }
    let items: OrderItem[] = [item];
    let id: OrderId = { value: "202200000001" };

    let newOrder = new Order(cpf, id);

    expect(orders.add(newOrder)).toBeTruthy();
})

test("order should update order status", (): void => {
    const orders = new NonPersistentOrdersRepository();
    let product: Product = camera;
    let item: OrderItem = {
        productId: product.id,
        productDetails: product.dimensionsAndWeight,
        price: product.price,
        quantity: 2,
    }
    let items: OrderItem[] = [item];
    let id: OrderId = { value: "202200000001" };

    let newOrder = new Order(cpf, id);
    expect(orders.add(newOrder)).toBeTruthy();
    expect(orders.getOrder(id)?.status).toBe(OrderStatus.PENDING);
    expect(orders.updateStatus(id, OrderStatus.CONFIRMED)).toBeTruthy();
    expect(orders.getOrder(id)?.status).toBe(OrderStatus.CONFIRMED);
})