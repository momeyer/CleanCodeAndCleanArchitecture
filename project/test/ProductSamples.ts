import { PhysicalAttributes } from "../src/domain/entity/PhysicalAttributes";
import { Product } from "../src/domain/entity/Product";

export const camera: Product = {
    id: 1,
    description: "Camera",
    physicalAttributes: new PhysicalAttributes(20, 15, 10, 1),
    price: 10
};

export const guitar: Product = {
    id: 2,
    description: "Guitar",
    physicalAttributes: new PhysicalAttributes(100, 30, 10, 3),
    price: 20
};


export const rubberDuck: Product = {
    id: 3,
    description: "Rubber Duck",
    physicalAttributes: new PhysicalAttributes(5, 5, 5, 0.05),
    price: 1
};