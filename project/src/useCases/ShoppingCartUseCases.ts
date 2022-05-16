import { DiscountCodeRepository } from "../domain/DiscountCodeRepository";
import PriceCalculator from "../domain/PriceCalculator";
import { ProductRepository } from "../domain/ProductRepository";
import { ShippingCalculator } from "../domain/ShippingCalculator";
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
        if (!productInRepository || productInRepository.quantity == 0 || input.quantity <= 0 || input.quantity > productInRepository.quantity) {
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

    generateSummary(): Summary {
        let summary = new Summary();
        let shippingCalculator = new ShippingCalculator();
        let priceCalculator = new PriceCalculator();

        const items = this.shoppingCart.getContent();
        if (!items.length) {
            return summary;
        }

        items.forEach(item => {
            summary.addItem(item.productId, item.price, item.quantity);
            shippingCalculator.addProductDetails(item.productDetails, item.quantity);
            priceCalculator.add(item.price, item.quantity);
        })

        if (this.shoppingCart.discount) {
            summary.addDiscount(this.shoppingCart.discount);
        }
        summary.addShippingCost(shippingCalculator.calculate());
        summary.total = priceCalculator.calculate(summary.discount) + summary.shippingCost;
        return summary;
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

type Item = {
    id: number;
    price: number;
    quantity: number
}

class Summary {

    items: Item[];
    discount?: number;
    shippingCost: number;
    total: number;

    constructor() {
        this.items = [];
        this.shippingCost = 0;
        this.total = 0;
    }

    addItem(id: number, price: number, quantity: number): void {
        let item = {
            id: id,
            price: price,
            quantity: quantity
        }
        this.items.push(item);
    }

    addDiscount(discount: number): void {
        this.discount = discount;
    }

    addShippingCost(shippingCost: number): void {
        this.shippingCost = shippingCost;
    }
}