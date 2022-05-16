import { DiscountCodeRepository } from "../domain/DiscountCodeRepository";
import { OrderItem } from "../domain/entity/Order";
import PriceCalculator from "../domain/entity/PriceCalculator";
import { ShippingCalculator } from "../domain/entity/ShippingCalculator";
import ShoppingCart from "../domain/entity/ShoppingCart";
import { ProductRepository } from "../domain/ProductRepository";


export class ShoppingCartUseCases {
    private shoppingCart: ShoppingCart;

    constructor(readonly productRepository: ProductRepository, readonly discountCodeRepository: DiscountCodeRepository) {
        this.shoppingCart = new ShoppingCart();
    }

    getContent(): AddItemOutput[] {
        const output: AddItemOutput[] = [];
        const content = this.shoppingCart.getContent();
        content.forEach(item => {
            output.push({
                productId: item.productId,
                quantity: item.quantity
            })
        })
        return output;
    }

    async addItem(input: AddItemInput): Promise<boolean> {
        const productInRepository = await this.productRepository.find(input.productId);
        // TODO improve error handling
        if (!productInRepository || productInRepository.quantity == 0 || input.quantity <= 0 || input.quantity > productInRepository.quantity) {
            return false;
        }
        return this.shoppingCart.addItem(productInRepository.product, input.quantity);
    }

    removeItem(idToRemove: number): boolean {
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

    private populateSummary(summary: Summary, items: OrderItem[]): Summary {
        let shippingCalculator = new ShippingCalculator();
        let priceCalculator = new PriceCalculator();

        items.forEach(item => {
            summary.items.push({ id: item.productId, price: item.price, quantity: item.quantity });
            shippingCalculator.addProductDetails(item.productDetails, item.quantity);
            priceCalculator.add(item.price, item.quantity);
        })

        summary.discount = this.shoppingCart.discount;
        summary.shippingCost = shippingCalculator.calculate();
        summary.subtotal = priceCalculator.calculate(summary.discount);
        summary.total = summary.subtotal + summary.shippingCost;
        return summary;
    }

    generateSummary(): Summary {
        let summary: Summary = {
            items: [],
            subtotal: 0,
            total: 0,
            shippingCost: 0,
        };

        const items = this.shoppingCart.getContent();
        if (!items.length) {
            return summary;
        }

        return this.populateSummary(summary, items);
    }


}

type AddItemInput = {
    productId: number;
    quantity: number;
}

type AddItemOutput = {
    productId: number;
    quantity: number;
}

type SummaryItem = {
    id: number;
    price: number;
    quantity: number
}

type Summary = {

    items: SummaryItem[];
    discount?: number;
    subtotal: number;
    shippingCost: number;
    total: number;
}