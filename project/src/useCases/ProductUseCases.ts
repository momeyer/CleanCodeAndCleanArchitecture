import { PhysicalAttributes } from "../domain/entity/PhysicalAttributes";
import { Product } from "../domain/entity/Product";
import { ProductRepository } from "../domain/repository/ProductRepository";

export class ProductUseCases {
  constructor(readonly productRepository: ProductRepository) {}
  async add(input: AddInput): Promise<boolean> {
    try {
      const id = await this.productRepository.nextId();
      const attributes = new PhysicalAttributes(input.height, input.weight, input.depth, input.weight);
      let product = new Product(id, input.description, attributes, input.price);
      return await this.productRepository.add(product);
    } catch (error) {
      return false;
    }
  }

  async list(): Promise<OutputList> {
    const listOfProducts = await this.productRepository.list();
    let output: OutputList = {
      list: [],
    };
    listOfProducts.forEach((info): void => {
      const productInfo = {
        id: info.id,
        description: info.description,
        price: info.price,
      };
      output.list.push(productInfo);
    });
    return output;
  }

  async search(id: number): Promise<SearchOutput | undefined> {
    const product = await this.productRepository.find(id);
    if (!product) {
      return undefined;
    }
    return {
      description: product.description,
      price: product.price,
    };
  }

  async remove(input: RemoveInput): Promise<boolean> {
    return this.productRepository.remove(input.id);
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
  list: { id: number; description: string; price: number }[];
};

type SearchOutput = {
  description: string;
  price: number;
};

type RemoveInput = {
  id: number;
  quantity: number;
};
