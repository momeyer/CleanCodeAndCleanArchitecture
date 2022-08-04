import { Order, OrderStatus } from "../domain/entity/Order";
import { OrderIdGenerator } from "../domain/entity/OrderIdGenerator";
import StockEntry from "../domain/entity/StockEntry";
import { OrdersRepository } from "../domain/repository/OrdersRepository";
import { ProductRepository } from "../domain/repository/ProductRepository";
import { ShoppingCartRepository } from "../domain/repository/ShoppingCartRepository";
import StockEntryRepository from "../domain/repository/StockEntryRepository";

export class OrderUseCases {
  constructor(
    readonly ordersRepository: OrdersRepository,
    readonly productRepository: ProductRepository,
    readonly stockRepository: StockEntryRepository,
    readonly orderIdGenerator: OrderIdGenerator,
    readonly shoppingCartRepository: ShoppingCartRepository
  ) {}

  async place(input: PlaceOrderInput): Promise<OutputOrderSummary> {
    let order: Order;
    const cart = await this.shoppingCartRepository.get(input.id);
    if (!cart || cart.isEmpty()) {
      return this.generateInvalidOrderSummary("Empty order", input.date);
    }
    const orderItems = cart.getContent();

    try {
      order = new Order(input.cpf, this.orderIdGenerator.generate(input.date), cart.discount, input.date);
      // will check stock and sent entry event
      for (const orderItem of orderItems) {
        await this.stockRepository.save(new StockEntry(orderItem.productId, "out", orderItem.quantity));

        order.addItem({
          productId: orderItem.productId,
          productDetails: orderItem.productDetails,
          quantity: orderItem.quantity,
          price: orderItem.price,
        });
      }
    } catch (error: any) {
      return this.generateInvalidOrderSummary(error.message, input.date);
    }
    await this.ordersRepository.add(order);
    return this.generateOrderSummary(order);
  }

  async cancel(orderId: string): Promise<boolean> {
    const order = await this.ordersRepository.get(orderId);

    if (!order || order.status !== OrderStatus.PENDING) {
      return false;
    }
    order.items.forEach((item): void => {
      this.productRepository.updateQuantityBy(item.productId, item.quantity);
    });
    return this.ordersRepository.updateStatus(orderId, OrderStatus.CANCELLED);
  }

  async search(orderId: string): Promise<OrderOutput | undefined> {
    const order = await this.ordersRepository.get(orderId);
    if (!order) {
      return undefined;
    }
    return { id: order?.id, status: order?.status.toString() };
  }

  async updateStatus(orderId: string, newStatus: OrderStatus): Promise<boolean> {
    return await this.ordersRepository.updateStatus(orderId, newStatus);
  }

  private generateInvalidOrderSummary(message: string, date: Date = new Date()): OutputOrderSummary {
    return {
      date: date,
      status: OrderStatus.INVALID,
      message: message,
    };
  }

  private generateOrderSummary(order: Order): OutputOrderSummary {
    return {
      id: order.id,
      date: order.time,
      status: order.status,
      items: JSON.stringify(order.items),
    };
  }
}

type InputItems = {
  productId: number;
  quantity: number;
};

type PlaceOrderInput = {
  cpf: string;
  id: string;
  date: Date;
};

type OutputOrderSummary = {
  id?: string;
  date?: Date;
  status?: OrderStatus;
  items?: string;
  message?: string;
};

type OrderOutput = {
  id?: string;
  status?: string;
};
