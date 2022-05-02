import { DimensionsAndWeight } from "./Product";

type ProductDetails = {
    dimensionsAndWeight: DimensionsAndWeight;
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

    addProductDetails(dimensionsAndWeight: DimensionsAndWeight, quantity: number): void {
        this.productsDetails.push({ dimensionsAndWeight, quantity });
    }

    private calculateProductShippingCost(product: ProductDetails): number {
        // price computed as = distance (km) * volume (m3) * (density/100)
        return this.distance_km * this.calculateItemVolumeInM3(product) * (this.calculateItemDensityInKgPerM3(product) / 100.0)
    }

    private calculateItemVolumeInM3(product: ProductDetails): number {
        const dimensionsInCm3 = product.dimensionsAndWeight.height_cm * product.dimensionsAndWeight.width_cm * product.dimensionsAndWeight.depth_cm;
        return dimensionsInCm3 / (1000000);
    }

    private calculateItemDensityInKgPerM3(product: ProductDetails): number {
        return product.dimensionsAndWeight.weight.value / this.calculateItemVolumeInM3(product);
    }
}