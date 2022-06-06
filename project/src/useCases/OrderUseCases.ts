import { Order, OrderStatus } from "../domain/entity/Order";
import { OrderIdGenerator } from "../domain/entity/OrderIdGenerator";
import { OrdersRepository } from "../domain/repository/OrdersRepository";
import { ProductRepository } from "../domain/repository/ProductRepository";
import { ShoppingCartRepository } from "../domain/repository/ShoppingCartRepository";

export class OrderUseCases {

    constructor(readonly ordersRepository: OrdersRepository, readonly productRepository: ProductRepository, readonly orderIdGenerator: OrderIdGenerator, readonly shoppingCartRepository: ShoppingCartRepository) { }

    async place(input: placeOrderInput): Promise<outputOrderSummary> {
        let order: Order;
        const cart = await this.shoppingCartRepository.get(input.id);

        if (!cart || cart.isEmpty()) {
            return this.generateInvalidOrderSummary("Empty order", input.date);
        }
        const orderItems = cart.getContent();
        try {
            order = new Order(input.cpf, this.orderIdGenerator.generate(input.date), cart.discount, input.date);
            this.addItemsToOrder(orderItems, order);
        } catch (error: any) {
            return this.generateInvalidOrderSummary(error.message, input.date);
        }
        this.ordersRepository.add(order);
        return this.generateOrderSummary(order);
    }

    async cancel(orderId: string): Promise<boolean> {
        const order = await this.ordersRepository.get(orderId);

        if (!order || order.status !== OrderStatus.PENDING) {
            return false;
        }
        order.items.forEach(item => {
            this.productRepository.updateQuantityBy(item.productId, item.quantity);
        })
        return this.ordersRepository.updateStatus(orderId, OrderStatus.CANCELLED);
    }

    async search(orderId: string): Promise<orderOutput | undefined> {
        const order = await this.ordersRepository.get(orderId);

        if (!order) { return undefined; }
        return { id: order?.id, status: order?.status.toString() };
    }

    private async addItemsToOrder(items: InputItems[], order: Order): Promise<Order> {
        items.forEach(async item => {
            const itemInRepository = await this.productRepository.find(item.productId);
            if (!itemInRepository) {
                throw new Error(`Item ${item.productId} not available`);
            }
            this.productRepository.remove(item.productId, item.quantity);
            order.addItem({
                productId: itemInRepository.product.id,
                productDetails: itemInRepository.product.physicalAttributes,
                quantity: item.quantity,
                price: itemInRepository.product.price
            });
        })
        return order;
    }

    private generateInvalidOrderSummary(message: string, date: Date = new Date()): outputOrderSummary {
        return {
            date: date,
            status: OrderStatus.INVALID,
            message: message,
        }
    }

    private generateOrderSummary(order: Order): outputOrderSummary {
        return {
            id: order.id,
            date: order.time,
            status: order.status,
        }
    }
}

type InputItems = {
    productId: number;
    quantity: number;
};

type placeOrderInput = {
    cpf: string
    id: string
    date: Date;
}


type outputOrderSummary = {
    id?: string
    date?: Date
    status?: OrderStatus
    message?: string
}

type orderOutput = {
    id?: string,
    status?: string
}