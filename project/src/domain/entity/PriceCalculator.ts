
export default class PriceCalculator {
    readonly priceAndQuantity: { price: number, quantity: number }[];
    readonly tax: number = 0.05
    total: number = 0;

    constructor() {
        this.priceAndQuantity = [];
    }

    calculate(discount?: number): number {
        this.calculateProductsCost();
        this.applyDiscount(discount);
        this.applyTax();

        return this.total;
    }

    add(price: number, quantity: number): void {
        this.priceAndQuantity.push({ price: price, quantity: quantity });
    }

    private applyTax(): void {
        this.total += (this.total * this.tax);
    }

    private applyDiscount(discount: number | undefined): void {
        this.total = discount ? this.total * (1.0 - discount) : this.total;
    }

    private calculateProductsCost(): void {
        this.total = 0;
        this.priceAndQuantity.forEach((cur): void => {
            this.total += cur.price * cur.quantity;
        })
    }
}