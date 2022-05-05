import { defineFeature, loadFeature } from 'jest-cucumber';
import { NonPersistentProductInventory } from '../../src/ProductInventory';
import ShoppingCart from "../../src/ShoppingCart";
import { camera } from "../../test/ProductSamples";

const feature = loadFeature('features/generateOrder.feature');

defineFeature(feature, (test) => {

    let inventory: NonPersistentProductInventory;
    let shoppingCart: ShoppingCart;

    beforeEach(() => {
        inventory = new NonPersistentProductInventory();
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