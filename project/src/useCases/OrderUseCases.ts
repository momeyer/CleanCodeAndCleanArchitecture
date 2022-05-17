import { Order, OrderStatus } from "../domain/entity/Order";
import { OrderIdGenerator } from "../domain/entity/OrderIdGenerator";
import { ShoppingCartId } from "../domain/entity/ShoppingCartIdGenerator";
import { OrdersRepository } from "../domain/OrdersRepository";
import { ProductRepository } from "../domain/ProductRepository";
import { ShoppingCartRepository } from "../domain/ShoppingCartRepository";

export class OrderUseCases {

    constructor(readonly ordersRepository: OrdersRepository, readonly productRepository: ProductRepository, readonly orderIdGenerator: OrderIdGenerator, readonly shoppingCartRepository: ShoppingCartRepository) { }

    async place(input: placeOrderInput): Promise<outputOrderSummary> {
        let order: Order;
        const cart = await this.shoppingCartRepository.get(input.id);

        if (!cart || cart.isEmpty()) {
            return this.generateinvalidOrderSummary("Empty order", input.date);
        }
        const orderItems = cart.getContent();
        try {
            order = new Order(input.cpf, this.orderIdGenerator.generate(input.date), cart.discount, input.date);
            this.addItemsToOrder(orderItems, order);
        } catch (error: any) {
            return this.generateinvalidOrderSummary(error.message, input.date);
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

    private generateinvalidOrderSummary(message: string, date: Date = new Date()): outputOrderSummary {
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
    id: ShoppingCartId
    date: Date;
}


type outputOrderSummary = {
    id?: string
    date?: Date
    status?: OrderStatus
    message?: string
}