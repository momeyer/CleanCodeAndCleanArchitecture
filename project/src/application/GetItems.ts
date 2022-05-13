import { ProductRepository } from "../domain/ProductRepository";

export class GetItems {
    productRepository: ProductRepository;

    constructor(productsRepository: ProductRepository) {
        this.productRepository = productsRepository;
    }

    async execute(): Promise<Output[]> {
        const productQuantityList = await this.productRepository.list();
        const output: Output[] = [];
        for (const item of productQuantityList) {
            output.push({
                id: item.product.id.value,
                description: item.product.description,
                price: item.product.price,
                quantity: item.quantity
            });
        }
        return output;
    }
}

type Output = {
    id: number;
    description: string;
    price: number;
    quantity: number;
}