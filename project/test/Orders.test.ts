import { Order, OrderItem, OrderStatus } from "../src/Order";
import { NonPersistentPlacedOrder, OrderId } from "../src/Orders";
import { Product } from "../src/Product";
import { camera } from "./ProductSamples";

test("order should persist", (): void => {
    const orders = new NonPersistentPlacedOrder();
    let product: Product = camera;

    let item: OrderItem = { product, quantity: 2 };
    let items: OrderItem[] = [item];
    let id: OrderId = { value: 1 };

    let newOrder = new Order("111.444.777-35", id, items);

    expect(orders.add(newOrder)).toBeTruthy();
    expect(orders.updateStatus(id, OrderStatus.CONFIRMED)).toBeTruthy();
})