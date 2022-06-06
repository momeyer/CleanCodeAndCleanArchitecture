import { PhysicalAttributes } from "./PhysicalAttributes";

type ProductDetails = {
    physicalAttributes: PhysicalAttributes;
    quantity: number;
}

export class ShippingCalculator {
    productsDetails: ProductDetails[];
    readonly minCost: number;
    distance_km: number;

    constructor() {
        this.productsDetails = [];
        this.minCost = 10;
        this.distance_km = 1000;
    }

    calculate(): number {
        if (!this.productsDetails.length) { return 0; }

        const total = this.productsDetails.reduce((total, product): number => {
            return total += (this.calculateProductShippingCost(product) * product.quantity);
        }, 0)

        return total < this.minCost ? this.minCost : total;
    }

    addProductDetails(physicalAttributes: PhysicalAttributes, quantity: number): void {
        this.productsDetails.push({ physicalAttributes, quantity });
    }

    private calculateProductShippingCost(product: ProductDetails): number {
        // price computed as = distance (km) * volume (m3) * (density/100)
        return this.distance_km * product.physicalAttributes.calculateVolumeInM3() * (product.physicalAttributes.calculateDensityInKgPerM3() / 100.0)
    }
}