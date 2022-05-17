import { Product } from "../src/domain/entity/Product";

export const camera: Product = {
    id: 1,
    description: "Camera",
    physicalAttributes: {
        height_cm: 20,
        width_cm: 15,
        depth_cm: 10,
        weight_kg: 1,
    },
    price: 10
};

export const guitar: Product = {
    id: 2,
    description: "Guitar",
    physicalAttributes: {
        height_cm: 100,
        width_cm: 30,
        depth_cm: 10,
        weight_kg: 3,
    },
    price: 20
};


export const rubberDuck: Product = {
    id: 3,
    description: "Rubber Duck",
    physicalAttributes: {
        height_cm: 5,
        width_cm: 5,
        depth_cm: 5,
        weight_kg: 0.05,
    },
    price: 1
};