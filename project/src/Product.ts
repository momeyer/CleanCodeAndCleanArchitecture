
export type ProductId = {
    value: number;
}


export type Weight_kg = {
    value: number;
}

export type DimensionsAndWeight = {
    height_cm: number;
    width_cm: number;
    depth_cm: number;
    weight: Weight_kg;
}

export type Product = {
    id: ProductId;
    description: string;
    dimensionsAndWeight: DimensionsAndWeight;
    price: number;
};
