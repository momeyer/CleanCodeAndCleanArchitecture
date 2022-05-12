import Cpf from "./Cpf";
import { DimensionsAndWeight } from "./DimensionsAndWeight";
import { OrderId } from "./OrdersRepository";
import PriceCalculator from "./PriceCalculator";
import { ProductId } from "./Product";
import { ShippingCalculator } from "./ShippingCalculator";

export type OrderItem = {
    productId: ProductId;
    productDetails: DimensionsAndWeight;
    quantity: number;
    price: number
}

export enum OrderStatus {
    PENDING,
    CANCELLED,
    CONFIRMED
}

export class Order {
    readonly cpf: Cpf;
    readonly items: OrderItem[];

    status: OrderStatus;
    private priceCalculator: PriceCalculator;
    private shippingCalculator: ShippingCalculator;

    constructor(cpf: string, readonly id: OrderId, orderItems: OrderItem[], readonly discount?: number, readonly time: Date = new Date()) {
        this.cpf = new Cpf(cpf);
        this.items = orderItems;

        this.status = OrderStatus.PENDING;
        this.priceCalculator = new PriceCalculator();
        this.shippingCalculator = new ShippingCalculator();
    }
    // TODO addDiscountCode()
    calculateTotalPrice(): number {
        return this.priceCalculator.calculate(this);
    }

    calculateShippingCost(): number {
        this.items.forEach((cur): void => {
            this.shippingCalculator.addProductDetails(cur.productDetails, cur.quantity);
        })

        return this.shippingCalculator.calculate();
    }
}