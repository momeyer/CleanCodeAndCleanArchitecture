
class ProductIdQuantity {

    quantity: number;

    constructor(readonly id: number, quantity: number) {
        this.quantity = quantity;
    }
}



export default class ShoppingCart {

    products: ProductIdQuantity[];

    constructor() {
        this.products = [];
    }

    // addProduct()
    // removeProduct()
    // updateProduct()
}