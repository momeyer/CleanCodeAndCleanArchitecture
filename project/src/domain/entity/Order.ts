import Cpf from "./Cpf";
import { PhysicalAttributes } from "./PhysicalAttributes";
import PriceCalculator from "./PriceCalculator";
import { ShippingCalculator } from "./ShippingCalculator";

export type OrderItem = {
    productId: number;
    productDetails: PhysicalAttributes;
    quantity: number;
    price: number
}

export enum OrderStatus {
    PENDING = "PENDING",
    CANCELLED = "CANCELED",
    CONFIRMED = "CONFIRMED",
    COMPLETE = "COMPLETE",
    INVALID = "INVALID"
}

export class Order {
    readonly cpf: Cpf;
    readonly items: OrderItem[];

    status: OrderStatus;
    private priceCalculator: PriceCalculator;
    private shippingCalculator: ShippingCalculator;

    constructor(cpf: string, readonly id: string, readonly discount?: number, readonly time: Date = new Date()) {
        this.cpf = new Cpf(cpf);
        this.items = [];

        this.status = OrderStatus.PENDING;
        this.priceCalculator = new PriceCalculator();
        this.shippingCalculator = new ShippingCalculator();
    }

    addItem(item: OrderItem): void {
        this.items.push(item);
    }

    calculateTotalPrice(): number {
        this.items.forEach(item => {
            this.priceCalculator.add(item.price, item.quantity);
        })
        return this.priceCalculator.calculate();
    }

    calculateShippingCost(): number {
        this.items.forEach((cur): void => {
            this.shippingCalculator.addProductDetails(cur.productDetails, cur.quantity);
        })

        return this.shippingCalculator.calculate();
    }
}