import { ProductRepository } from "../domain/ProductRepository";
import ShoppingCart from "../domain/ShoppingCart";


export class ShoppingCartUseCases {
    private shoppingCart: ShoppingCart;

    constructor(readonly productRepository: ProductRepository) {
        this.shoppingCart = new ShoppingCart();
    }
    getContent(): Output[] {
        const output: Output[] = [];
        const content = this.shoppingCart.getAllItems();
        content.forEach(item => {
            output.push({
                productId: item.productId,
                quantity: item.quantity
            })
        })
        return output;

    }

    async addItem(input: Input): Promise<boolean> {
        const productId = 1;
        const productInRepository = await this.productRepository.find(productId);
        if (!productInRepository || productInRepository.quantity == 0 || input.quantity <= 0) {
            return false;
        }
        return this.shoppingCart.addItem(productInRepository.product, input.quantity);
    }
}

type Input = {
    productId: number;
    quantity: number;
}

type Output = {
    productId: number;
    quantity: number;
}