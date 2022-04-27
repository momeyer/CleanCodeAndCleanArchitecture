import Product from "./Product";

export enum OrderStatus {
    PENDING,
    CANCELLED,
    CONFIRMED
}

export class Order {

    products: Product[];

    constructor() {
        this.products = [];
    }
}