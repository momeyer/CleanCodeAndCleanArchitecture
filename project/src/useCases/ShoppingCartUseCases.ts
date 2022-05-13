import { DiscountCodeRepository } from "../domain/DiscountCodeRepository";
import { ProductRepository } from "../domain/ProductRepository";
import ShoppingCart from "../domain/ShoppingCart";


export class ShoppingCartUseCases {
    private shoppingCart: ShoppingCart;

    constructor(readonly productRepository: ProductRepository, readonly discountCodeRepository: DiscountCodeRepository) {
        this.shoppingCart = new ShoppingCart();
    }
    getContent(): Output[] {
        const output: Output[] = [];
        const content = this.shoppingCart.getContent();
        content.forEach(item => {
            output.push({
                productId: item.productId,
                quantity: item.quantity
            })
        })
        return output;
    }

    async addItem(input: Input): Promise<boolean> {
        const productInRepository = await this.productRepository.find(input.productId);
        if (!productInRepository || productInRepository.quantity == 0 || input.quantity <= 0) {
            return false;
        }
        return this.shoppingCart.addItem(productInRepository.product, input.quantity);
    }

    removeItem(idToRemove: number): boolean {
        if (!this.shoppingCart.getItemQuantity(idToRemove)) {
            return false;
        }
        return this.shoppingCart.removeItem(idToRemove);
    }

    clear(): void {
        this.shoppingCart.clear();
    }

    getItemQuantity(productId: number): number {
        return this.shoppingCart.getItemQuantity(productId);
    }

    async applyDiscountCode(code: string, curDate: Date = new Date): Promise<boolean> {
        const discount = await this.discountCodeRepository.getDiscount(code, curDate);
        if (!discount) {
            return false;
        }
        this.shoppingCart.applyDiscountCode(discount);
        return true;
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