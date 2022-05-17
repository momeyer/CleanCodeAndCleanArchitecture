import { Order } from "../src/domain/entity/Order";
import { OrderIdGenerator } from "../src/domain/entity/OrderIdGenerator";
import { NonPersistentOrdersRepository } from "../src/NonPersistentOrdersRepository";

test("should incrise sequencial", () => {
    const orders = new NonPersistentOrdersRepository();
    const orderIdGenerator = new OrderIdGenerator(orders.placeOrders.size + 1);


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
    expect(orderIdGenerator.generate(date)).toBe("202100000014");
})