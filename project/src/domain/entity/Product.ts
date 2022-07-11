import { PhysicalAttributes } from "./PhysicalAttributes";

export class Product {
    constructor(readonly id: number,
        readonly description: string,
        readonly physicalAttributes: PhysicalAttributes,
        readonly price: number) {
        if (price <= 0) {
            throw new Error("Product's price needs to be more than 0");
        }
    }
}

