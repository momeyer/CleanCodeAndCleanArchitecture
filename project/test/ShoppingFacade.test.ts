import { anything, instance, mock, when } from "ts-mockito";
import ECommerce from "../src/ECommerce";
import { OrderStatus } from "../src/Order";
import PlacedOrders from "../src/Orders";
import Product from "../src/Product";
import { NonPersistentProductInventory } from "../src/ProductInventory";
import ShoppingFacade from "../src/ShoppingFacade";

describe("Shopping Facade Acceptance", (): void => {
    let mockedPlacedOrders: PlacedOrders;
    let placedOrders: PlacedOrders;
    let product1Id = 1;
    let product2Id = 2;
    let invalidProductId = 100;
    let product1 = new Product(product1Id, 10);
    let product2 = new Product(product2Id, 20);

    let inventory: NonPersistentProductInventory;

    let ecommerce: ECommerce;
    let shoppingFacade: ShoppingFacade;

    beforeEach((): void => {
        mockedPlacedOrders = mock<PlacedOrders>();
        placedOrders = instance(mockedPlacedOrders);

        inventory = new NonPersistentProductInventory();

        ecommerce = new ECommerce(placedOrders, inventory);
        shoppingFacade = new ShoppingFacade(ecommerce);
        inventory.addProduct(product1, 100);
        inventory.addProduct(product2, 50);
    })


    test("try to cancel non-existing order", (): void => {
        when(mockedPlacedOrders.updateStatus(anything(), anything())).thenReturn(false);
        expect(shoppingFacade.cancelPlacedOrder(10)).toBeFalsy();
    });

    test("cancel existing order", (): void => {
        when(mockedPlacedOrders.updateStatus(product1Id, anything())).thenReturn(true);
        expect(shoppingFacade.cancelPlacedOrder(product1Id)).toBeTruthy();
    });

    test("try to add invalid product to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(invalidProductId, 1)).toBeFalsy();
    });

    test("try to add invalid Id product to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(0, 1)).toBeFalsy();
        expect(shoppingFacade.addProductToShoppingCart(-1, 1)).toBeFalsy();
    });

    test("try to add negative quantity of product to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(product1Id, -10)).toBeFalsy();
    });

    test("try to add zero as quantity of product to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(product1Id, 0)).toBeFalsy();
    });

    test("add product to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(product1Id, 1)).toBeTruthy();
    });

    test("add different products to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(product1Id, 1)).toBeTruthy();
        expect(shoppingFacade.addProductToShoppingCart(product2Id, 1)).toBeTruthy();
    });

    test("add more of same product to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(product1Id, 1)).toBeTruthy();
        expect(shoppingFacade.addProductToShoppingCart(product1Id, 1)).toBeTruthy();
    });

    test("try to remove invalid product to shopping cart", (): void => {
        expect(shoppingFacade.removeProductToShoppingCart(invalidProductId)).toBeFalsy();
    });

    test("try to remove product from empty shopping cart", (): void => {
        expect(shoppingFacade.removeProductToShoppingCart(product1Id)).toBeFalsy();
    });

    test("remove product from shopping cart", (): void => {
        shoppingFacade.addProductToShoppingCart(product1Id, 2);
        shoppingFacade.addProductToShoppingCart(product2Id, 2);
        expect(shoppingFacade.removeProductToShoppingCart(product1Id)).toBeTruthy();
    });

    test("try to create order from empty shopping cart", (): void => {
        expect(shoppingFacade.createOrderFromShoppingCart()).toBeUndefined();
    });

    test("create order from shopping cart", (): void => {
        shoppingFacade.addProductToShoppingCart(product1Id, 2);
        shoppingFacade.addProductToShoppingCart(product2Id, 1);
        const order = shoppingFacade.createOrderFromShoppingCart();
        expect(order).toBeDefined();
        expect(order?.calculateTotalPrice()).toBe(40);
        expect(order?.status).toBe(OrderStatus.PENDING);
        expect(inventory.findProduct(product1Id)?.quantity).toBe(98);
        expect(inventory.findProduct(product2Id)?.quantity).toBe(49);
    });
})