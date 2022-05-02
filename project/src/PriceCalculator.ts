import { Order } from "./Order";


export default class PriceCalculator {
    readonly tax: number = 0.05
    readonly shippingCost: number = 10;

    calculate(order: Order) {
        let total = 0;
        order.items.forEach((cur): void => {
            total += cur.quantity * cur.product.price;
        })

        total = this.applyTax(total);

        if (order.discount) { total = this.applyDiscount(total, order.discount) };

        return total + this.shippingCost;
    }

    private applyTax(price: number): number {
        return price + (price * this.tax);
    }

    private applyDiscount(price: number, discount: number): number {
        return price * (1.0 - discount);
    }
}