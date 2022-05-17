import { PhysicalAttributes } from "./PhysicalAttributes";

export class Product {
    constructor(readonly id: number,
        readonly description: string,
        readonly physicalAttributes: PhysicalAttributes,
        readonly price: number) { }
}

