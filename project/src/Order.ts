import { ProductQuantity } from "./ProductInventory";

export enum OrderStatus {
    PENDING,
    CANCELLED,
    CONFIRMED
}

export class Order {

    status: OrderStatus;
    private productsAndQuantity: ProductQuantity[];

    constructor(productsAndQuantity: ProductQuantity[], discountCode?: string) {
        this.productsAndQuantity = productsAndQuantity;
        this.status = OrderStatus.PENDING;
    }

    calculateTotalPrice(): number {
        let total = 0;
        this.productsAndQuantity.forEach((cur): void => {
            total += cur.quantity * cur.product.price;
        })
        return total;
    }
}