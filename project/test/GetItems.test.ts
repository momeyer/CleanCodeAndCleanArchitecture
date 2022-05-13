import { GetItems } from "../src/application/GetItems";
import { NonPersistentProductRepository } from "../src/NonPersistentProductRepository";
import { camera, guitar, rubberDuck } from "./ProductSamples";

test("Should get all items", async function (): Promise<void> {
    const productsRepository = new NonPersistentProductRepository();
    productsRepository.add(camera, 10);
    productsRepository.add(guitar, 20);
    productsRepository.add(rubberDuck, 10);

    const getItems = new GetItems(productsRepository);
    const output = await getItems.execute();
    expect(output).toHaveLength(3);
});