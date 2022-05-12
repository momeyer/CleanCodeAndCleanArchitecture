import { DimensionsAndWeight } from "./DimensionsAndWeight";

export type ProductId = {
    value: number;
}

export type Product = {
    id: ProductId;
    description: string;
    dimensionsAndWeight: DimensionsAndWeight;
    price: number;
};
