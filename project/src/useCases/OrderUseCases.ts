import { Order, OrderStatus } from "../domain/entity/Order";
import { OrderIdGenerator } from "../domain/entity/OrderIdGenerator";
import { OrdersRepository } from "../domain/OrdersRepository";
import { ProductRepository } from "../domain/ProductRepository";

export class OrderUseCases {

    constructor(readonly ordersRepository: OrdersRepository, readonly productRepository: ProductRepository, readonly orderIdGenerator: OrderIdGenerator) { }

    async place(input: inputOrder): Promise<outputOrderSummary> {
        let order: Order;
        if (!input.orderItems.length) {
            return this.generateinvalidOrderSummary(input.date, "Empty order");
        }
        try {
            order = new Order(input.cpf, this.orderIdGenerator.generate(input.date), input.discount, input.date);
            this.addItemsToOrder(input.orderItems, order);
        } catch (error: any) {
            return this.generateinvalidOrderSummary(input.date, error.message);
        }
        this.ordersRepository.add(order);
        return this.generateOrderSummary(order);
    }

    private async addItemsToOrder(items: InputItems[], order: Order): Promise<Order> {
        items.forEach(async item => {
            const itemInRepository = await this.productRepository.find(item.productId);
            if (!itemInRepository) {
                throw new Error(`Item ${item.productId} not available`);
            }
            order.addItem({
                productId: itemInRepository.product.id,
                productDetails: itemInRepository.product.dimensionsAndWeight,
                quantity: item.quantity,
                price: itemInRepository.product.price
            });
        })
        return order;
    }

    private generateinvalidOrderSummary(date: Date, message: string): outputOrderSummary {
        return {
            date: date,
            status: OrderStatus.INVALID,
            message: message,
        }
    }

    private generateOrderSummary(order: Order): outputOrderSummary {
        return {
            id: order.id.value,
            date: order.time,
            status: order.status,
        }
    }
}

type InputItems = {
    productId: number;
    quantity: number;
};

type inputOrder = {
    cpf: string
    orderItems: InputItems[]
    discount?: number
    date: Date
}


type outputOrderSummary = {
    id?: string
    date?: Date
    status?: OrderStatus
    message?: string
}