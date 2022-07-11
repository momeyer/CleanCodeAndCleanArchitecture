import { PhysicalAttributes } from "../domain/entity/PhysicalAttributes";
import { Product } from "../domain/entity/Product";
import { ProductRepository } from "../domain/repository/ProductRepository";

export class ProductUseCases {
  constructor(readonly productRepository: ProductRepository) {}
  async add(input: AddInput): Promise<boolean> {
    try {
      const id = await this.productRepository.nextId();
      console.log("id: ", id);
      const attributes = new PhysicalAttributes(input.height, input.weight, input.depth, input.weight);
      console.log("attributes: ", attributes);
      let product = new Product(id, input.description, attributes, input.price);
      console.log("product: ", product);
      return await this.productRepository.add(product, input.quantity);
    } catch (error) {
      console.log("Error ", error);
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
        id: info.product.id,
        description: info.product.description,
        price: info.product.price,
      };
      output.list.push(productInfo);
    });
    return output;
  }

  async search(id: number): Promise<SearchOutput | undefined> {
    const productAndQuantity = await this.productRepository.find(id);
    if (!productAndQuantity) {
      return undefined;
    }
    return {
      description: productAndQuantity.product.description,
      price: productAndQuantity.product.price,
      inStock: productAndQuantity.quantity,
    };
  }

  async remove(input: RemoveInput): Promise<boolean> {
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
  list: { id: number; description: string; price: number }[];
};

type SearchOutput = {
  description: string;
  price: number;
  inStock: number;
};

type RemoveInput = {
  id: number;
  quantity: number;
};
