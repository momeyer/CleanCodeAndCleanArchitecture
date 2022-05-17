import { Order } from "../src/domain/entity/Order";
import { OrderIdGenerator } from "../src/domain/entity/OrderIdGenerator";
import { NonPersistentOrdersRepository } from "../src/NonPersistentOrdersRepository";

test("should increase sequencial", () => {
    const orders = new NonPersistentOrdersRepository();
    const orderIdGenerator = new OrderIdGenerator(orders.placeOrders.size);

    const date = new Date("2021-01-10");
    const cpf = "111.444.777-35";

    orders.add(new Order(cpf, orderIdGenerator.generate(date)));
    orders.add(new Order(cpf, orderIdGenerator.generate(date)));
    orders.add(new Order(cpf, orderIdGenerator.generate(date)));
    orders.add(new Order(cpf, orderIdGenerator.generate(date)));
    orders.add(new Order(cpf, orderIdGenerator.generate(date)));
    orders.add(new Order(cpf, orderIdGenerator.generate(date)));
    orders.add(new Order(cpf, orderIdGenerator.generate(date)));
    orders.add(new Order(cpf, orderIdGenerator.generate(date)));
    orders.add(new Order(cpf, orderIdGenerator.generate(date)));
    orders.add(new Order(cpf, orderIdGenerator.generate(date)));
    orders.add(new Order(cpf, orderIdGenerator.generate(date)));
    orders.add(new Order(cpf, orderIdGenerator.generate(date)));
    expect(orderIdGenerator.generate(date)).toBe("202100000013");
})