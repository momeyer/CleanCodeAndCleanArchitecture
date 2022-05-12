import { Order, OrderItem, OrderStatus } from "../src/domain/Order";
import { Product } from "../src/domain/Product";
import { NonPersistentOrdersRepository } from "../src/NonPersistentOrdersRepository";
import { OrderId } from "../src/OrdersRepository";
import { camera } from "./ProductSamples";

test("order should persist", (): void => {
    const orders = new NonPersistentOrdersRepository();
    let product: Product = camera;

    let item: OrderItem = { product, quantity: 2 };
    let items: OrderItem[] = [item];
    let id: OrderId = { value: "202200000001" };

    let newOrder = new Order("111.444.777-35", id, items);

    expect(orders.add(newOrder)).toBeTruthy();
    expect(orders.updateStatus(id, OrderStatus.CONFIRMED)).toBeTruthy();
})

test("generateNext", () => {
    let product: Product = camera;

    let item: OrderItem = { product, quantity: 2 };
    let items: OrderItem[] = [item];
    let id: OrderId = { value: "202200000001" };

    const orders = new NonPersistentOrdersRepository();
    orders.add(new Order("111.444.777-35", orders.generateNextOrderId(), items));
    orders.add(new Order("111.444.777-35", orders.generateNextOrderId(), items));
    orders.add(new Order("111.444.777-35", orders.generateNextOrderId(), items));
    orders.add(new Order("111.444.777-35", orders.generateNextOrderId(), items));
    orders.add(new Order("111.444.777-35", orders.generateNextOrderId(), items));
    orders.add(new Order("111.444.777-35", orders.generateNextOrderId(), items));
    orders.add(new Order("111.444.777-35", orders.generateNextOrderId(), items));
    orders.add(new Order("111.444.777-35", orders.generateNextOrderId(), items));
    orders.add(new Order("111.444.777-35", orders.generateNextOrderId(), items));
    orders.add(new Order("111.444.777-35", orders.generateNextOrderId(), items));
    orders.add(new Order("111.444.777-35", orders.generateNextOrderId(), items));
    orders.add(new Order("111.444.777-35", orders.generateNextOrderId(), items));
    expect(orders.generateNextOrderId().value).toBe("202200000013");
})