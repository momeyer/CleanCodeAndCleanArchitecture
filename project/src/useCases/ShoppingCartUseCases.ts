import { DiscountCodeRepository } from "../domain/repository/DiscountCodeRepository";
import { OrderItem } from "../domain/entity/Order";
import PriceCalculator from "../domain/entity/PriceCalculator";
import { ShippingCalculator } from "../domain/entity/ShippingCalculator";
import ShoppingCart from "../domain/entity/ShoppingCart";
import { ShoppingCartIdGenerator } from "../domain/entity/ShoppingCartIdGenerator";
import { ProductRepository } from "../domain/repository/ProductRepository";
import { ShoppingCartRepository } from "../domain/repository/ShoppingCartRepository";


export class ShoppingCartUseCases {

    constructor(readonly productRepository: ProductRepository, readonly discountCodeRepository: DiscountCodeRepository, readonly shoppingCartRepository: ShoppingCartRepository, readonly shoppingCartidGenerator: ShoppingCartIdGenerator) {
    }

    async create(): Promise<ShoppingCart> {
        const newId = this.shoppingCartidGenerator.generate();
        const shoppingCart = new ShoppingCart(newId);
        await this.shoppingCartRepository.add(shoppingCart);
        return shoppingCart;
    }

    async getContent(shoppingCartId: string): Promise<AddItemOutput[]> {
        const output: AddItemOutput[] = [];
        const cart = await this.shoppingCartRepository.get(shoppingCartId);
        if (!cart) {
            return [];
        }
        const content = cart.getContent();
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
        const cart = await this.shoppingCartRepository.get(input.shoppingCartId);
        if (!productInRepository || !cart) {
            return false;
        }

        const isValidQuantity = (productInRepository.quantity > 0) && (input.quantity > 0);
        const hasAvailableInStock = input.quantity <= productInRepository.quantity;
        if (!isValidQuantity || !hasAvailableInStock) {
            return false;
        }

        cart.addItem(productInRepository.product, input.quantity);
        this.shoppingCartRepository.add(cart);
        return true;
    }

    async removeItem(shoppingCartId: string, idToRemove: number): Promise<boolean> {
        const cart = await this.shoppingCartRepository.get(shoppingCartId);
        if (!cart) {
            return false;
        }

        cart.removeItem(idToRemove);
        this.shoppingCartRepository.add(cart);
        return true;
    }

    async clear(shoppingCartId: string): Promise<void> {
        this.shoppingCartRepository.remove(shoppingCartId);
    }

    async getItemQuantity(shoppingCartId: string, productId: number): Promise<number> {
        const cart = await this.shoppingCartRepository.get(shoppingCartId);
        if (!cart) {
            return 0;
        }
        return cart.getItemQuantity(productId);
    }

    async applyDiscountCode(shoppingCartId: string, code: string, curDate: Date = new Date): Promise<boolean> {
        const discount = await this.discountCodeRepository.getDiscount(code, curDate);
        const cart = await this.shoppingCartRepository.get(shoppingCartId);
        if (!cart) {
            return false;
        }
        if (!discount) {
            return false;
        }
        cart.applyDiscountCode(discount);
        this.shoppingCartRepository.add(cart);
        return true;
    }

    async generateSummary(shoppingCartId: string): Promise<Summary> {
        let summary: Summary = {
            items: [],
            subtotal: 0,
            total: 0,
            shippingCost: 0,
        };
        const cart = await this.shoppingCartRepository.get(shoppingCartId)
        if (!cart) {
            return summary;
        }

        const items = cart.getContent();
        if (!items.length) {
            return summary;
        }

        return this.populateSummary(summary, items, cart.discount);
    }

    private populateSummary(summary: Summary, items: OrderItem[], discount?: number): Summary {
        let shippingCalculator = new ShippingCalculator();
        let priceCalculator = new PriceCalculator();

        items.forEach(item => {
            summary.items.push({ id: item.productId, price: item.price, quantity: item.quantity });
            shippingCalculator.addProductDetails(item.productDetails, item.quantity);
            priceCalculator.add(item.price, item.quantity);
        })

        summary.discount = discount;
        summary.shippingCost = shippingCalculator.calculate();
        summary.subtotal = priceCalculator.calculate(summary.discount);
        summary.total = summary.subtotal + summary.shippingCost;
        return summary;
    }
    //TODO estimateShippingCost()
}

type AddItemInput = {
    shoppingCartId: string;
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