import { DimensionsAndWeight } from "./DimensionsAndWeight";

export class Product {
    constructor(readonly id: number,
        readonly description: string,
        readonly dimensionsAndWeight: DimensionsAndWeight,
        readonly price: number) { }
}

