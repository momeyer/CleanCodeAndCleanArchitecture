import { Product } from "../src/Product";

export const camera: Product = {
    id: { value: 1 },
    description: "Camera",
    dimensionsAndWeight: {
        height_cm: 20,
        width_cm: 15,
        depth_cm: 10,
        weight: { value: 1 },
    },
    price: 10
};

export const guitar: Product = {
    id: { value: 2 },
    description: "Guitar",
    dimensionsAndWeight: {
        height_cm: 100,
        width_cm: 30,
        depth_cm: 10,
        weight: { value: 3 },
    },
    price: 20
};


export const rubberDuck: Product = {
    id: { value: 3 },
    description: "Rubber Duck",
    dimensionsAndWeight: {
        height_cm: 5,
        width_cm: 5,
        depth_cm: 5,
        weight: { value: 0.05 },
    },
    price: 1
};