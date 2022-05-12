import { Order } from "./Order";
import { ShippingCalculator } from "./ShippingCalculator";



export default class PriceCalculator {
    readonly tax: number = 0.05
    total: number = 0;

    calculate(order: Order): number {
        this.calculateProductsCost(order);
        this.applyDiscount(order.discount);
        this.applyTax();

        return this.total;
    }

    private applyTax(): void {
        this.total += (this.total * this.tax);
    }

    private applyDiscount(discount: number | undefined): void {
        this.total = discount ? this.total * (1.0 - discount) : this.total;
    }

    private calculateProductsCost(order: Order): void {
        this.total = 0;
        order.items.forEach((cur): void => {
            this.total += cur.quantity * cur.product.price;
        })
    }
}