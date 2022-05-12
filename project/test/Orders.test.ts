import { Order, OrderItem, OrderStatus } from "../src/domain/Order";
import { OrderId } from "../src/domain/OrdersRepository";
import { Product } from "../src/domain/Product";
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

    let newOrder = new Order(cpf, id, items);

    expect(orders.add(newOrder)).toBeTruthy();
    expect(orders.updateStatus(id, OrderStatus.CONFIRMED)).toBeTruthy();
})

test("generateNext", () => {
    let product: Product = camera;

    let item: OrderItem = {
        productId: product.id,
        productDetails: product.dimensionsAndWeight,
        price: product.price,
        quantity: 2,
    }
    let items: OrderItem[] = [item];
    let id: OrderId = { value: "202200000001" };

    const orders = new NonPersistentOrdersRepository();
    orders.add(new Order(cpf, orders.generateNextOrderId(), items));
    orders.add(new Order(cpf, orders.generateNextOrderId(), items));
    orders.add(new Order(cpf, orders.generateNextOrderId(), items));
    orders.add(new Order(cpf, orders.generateNextOrderId(), items));
    orders.add(new Order(cpf, orders.generateNextOrderId(), items));
    orders.add(new Order(cpf, orders.generateNextOrderId(), items));
    orders.add(new Order(cpf, orders.generateNextOrderId(), items));
    orders.add(new Order(cpf, orders.generateNextOrderId(), items));
    orders.add(new Order(cpf, orders.generateNextOrderId(), items));
    orders.add(new Order(cpf, orders.generateNextOrderId(), items));
    orders.add(new Order(cpf, orders.generateNextOrderId(), items));
    orders.add(new Order(cpf, orders.generateNextOrderId(), items));
    expect(orders.generateNextOrderId().value).toBe("202200000013");
})