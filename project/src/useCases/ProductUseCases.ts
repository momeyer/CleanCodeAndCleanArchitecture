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

    async list(): Promise<OutputList> {
        let listOfProducts = await this.productRepository.list();
        let output: OutputList = {
            list: []
        };

        listOfProducts.forEach(productQuantity => {
            output.list.push({ id: productQuantity.product.id, description: productQuantity.product.description, price: productQuantity.product.price })
        })

        return output;
    }
    async search(input: searchInput): Promise<searchOutput | undefined> {

        let product = await this.productRepository.find(input.id);
        if (!product) {
            return undefined;
        }
        return {
            description: product.product.description,
            price: product.product.price,
            inStock: product.quantity
        };
    }

    async remove(input: removeInput): Promise<boolean> {
        return this.productRepository.remove(input.id, input.quantity);
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

type OutputList = {
    list: { id: number, description: string, price: number }[];
}

type searchInput = {
    id: number
}

type searchOutput = {
    description: string;
    price: number;
    inStock: number
};

type removeInput = {
    id: number
    quantity: number
}

