import Cpf from "./Cpf";
import { OrderId } from "./OrdersRepository";
import PriceCalculator from "./PriceCalculator";
import { Product } from "./Product";
import { ShippingCalculator } from "./ShippingCalculator";

export type OrderItem = {
    product: Product; // productID, price
    quantity: number;
}

export enum OrderStatus {
    PENDING,
    CANCELLED,
    CONFIRMED
}

export class Order {
    readonly id: OrderId;
    readonly cpf: Cpf;
    readonly discount?: number;
    readonly items: OrderItem[];

    status: OrderStatus;
    private priceCalculator: PriceCalculator;
    private shippingCalculator: ShippingCalculator;

    constructor(cpf: string, orderId: OrderId, orderItems: OrderItem[], discount?: number, readonly time: Date = new Date()) {
        this.id = orderId;
        this.cpf = new Cpf(cpf);
        this.discount = discount;
        this.items = orderItems;

        this.status = OrderStatus.PENDING;
        this.priceCalculator = new PriceCalculator();
        this.shippingCalculator = new ShippingCalculator();
    }
    // TODO addItem()
    // TODO addDiscountCode()
    calculateTotalPrice(): number {
        return this.priceCalculator.calculate(this);
    }

    calculateShippingCost(): number {
        this.items.forEach((cur): void => {
            this.shippingCalculator.addProductDetails(cur.product.dimensionsAndWeight, cur.quantity);
        })

        return this.shippingCalculator.calculate();
    }
}