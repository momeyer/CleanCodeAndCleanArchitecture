import { anything, instance, mock, when } from "ts-mockito";
import ECommerce from "../src/ECommerce";
import PlacedOrders from "../src/Orders";
import Product from "../src/Product";
import { NonPersistentProductInventory } from "../src/ProductInventory";
import ShoppingFacade from "../src/ShoppingFacade";

describe("Shopping Facade Acceptance", (): void => {
    const mockedPlacedOrders: PlacedOrders = mock<PlacedOrders>();

    const placedOrders: PlacedOrders = instance(mockedPlacedOrders);
    const productId = 1;
    const invalidProductId = 100;

    const product1 = new Product(productId, 10);
    let inventory = new NonPersistentProductInventory();
    inventory.addProduct(product1, 1);

    const ecommerce = new ECommerce(placedOrders, inventory);
    const shoppingFacade = new ShoppingFacade(ecommerce);

    test("cancel non-existing order", (): void => {
        when(mockedPlacedOrders.updateStatus(anything(), anything())).thenReturn(false);
        expect(shoppingFacade.cancelPlacedOrder(10)).toBeFalsy();
    });

    test("cancel existing order", (): void => {
        when(mockedPlacedOrders.updateStatus(productId, anything())).thenReturn(true);
        expect(shoppingFacade.cancelPlacedOrder(productId)).toBeTruthy();
    });

    test("add product to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(productId, 1)).toBeTruthy();
    });

    test("add invalid product to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(invalidProductId, 1)).toBeFalsy();
    });

    test("remove product from shopping cart", (): void => {
        expect(shoppingFacade.removeProductToShoppingCart(productId)).toBeTruthy();
    });

    test("remove invalid product to shopping cart", (): void => {
        expect(shoppingFacade.removeProductToShoppingCart(invalidProductId)).toBeFalsy();
    });


})