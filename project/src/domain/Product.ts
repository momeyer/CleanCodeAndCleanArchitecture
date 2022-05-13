import { DimensionsAndWeight } from "./DimensionsAndWeight";

export type Product = {
    id: number;
    description: string;
    dimensionsAndWeight: DimensionsAndWeight;
    price: number;
};
