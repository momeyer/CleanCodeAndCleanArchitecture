import { defineFeature, loadFeature } from 'jest-cucumber';
import ShoppingCart from "../../src/domain/ShoppingCart";
import { NonPersistentProductRepository } from "../../src/NonPersistentProductRepository";
import { camera } from "../../test/ProductSamples";

const feature = loadFeature('features/generateOrder.feature');

defineFeature(feature, (test) => {

    let inventory: NonPersistentProductRepository;
    let shoppingCart: ShoppingCart;

    beforeEach(() => {
        inventory = new NonPersistentProductRepository();
        inventory.addProduct(camera, 1);
    });

    test('Add camera to shopping cart', ({ given, when, then }) => {
        given('an empty shopping cart', () => {
            shoppingCart = new ShoppingCart(inventory);
            expect(shoppingCart.isEmpty()).toBeTruthy();
        });

        when('add camera to shopping cart', () => {
            shoppingCart.addProduct(camera.id, 1);
        });

        then('shopping cart should have one camera', () => {
            expect(shoppingCart.getAllItems().length).toBe(1);
        });
    });
});