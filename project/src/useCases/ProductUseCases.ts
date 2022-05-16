import { DimensionsAndWeight } from "../domain/entity/DimensionsAndWeight";
import { Product } from "../domain/entity/Product";
import { ProductRepository } from "../domain/ProductRepository";

export class ProductUseCases {

    constructor(readonly productRepository: ProductRepository) { }
    async add(input: AddInput): Promise<boolean> {
        try {
            const id = await this.productRepository.nextId();
            const dimensions = new DimensionsAndWeight(input.height, input.weight, input.depth, input.weight);
            let product = new Product(id, input.description, dimensions, input.price);
            return this.productRepository.add(product, input.quantity);
        } catch (error) {
            return false;
        }
    }
}


type AddInput = {
    description: string;
    height: number;
    width: number;
    depth: number;
    weight: number;
    price: number;
    quantity: number;
};