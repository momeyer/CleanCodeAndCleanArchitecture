import ECommerce from "../src/ECommerce";
import { OrderStatus } from "../src/Order";
import { NonPersistentPlacedOrder } from "../src/Orders";
import { ProductId } from "../src/Product";
import { NonPersistentProductInventory } from "../src/ProductInventory";
import ShoppingFacade from "../src/ShoppingFacade";

describe("Shopping Facade Acceptance", (): void => {
    let mockedPlacedOrders: NonPersistentPlacedOrder;
    let placedOrders: NonPersistentPlacedOrder;
    let product1Id: ProductId = { value: 1 };
    let product2Id: ProductId = { value: 2 };
    let nonExistingProductId: ProductId = { value: 100 };
    let product1 = { id: product1Id, price: 10 };
    let product2 = { id: product2Id, price: 20 };

    let inventory: NonPersistentProductInventory;

    let ecommerce: ECommerce;
    let shoppingFacade: ShoppingFacade;

    beforeEach((): void => {
        placedOrders = new NonPersistentPlacedOrder();

        inventory = new NonPersistentProductInventory();

        ecommerce = new ECommerce(placedOrders, inventory);
        shoppingFacade = new ShoppingFacade(ecommerce);
        inventory.addProduct(product1, 100);
        inventory.addProduct(product2, 50);
    })


    test("Should fail to add non-existing product to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(nonExistingProductId, 1)).toBeFalsy();
    });

    test("Should fail to add invalid product Id to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart({ value: 0 }, 1)).toBeFalsy();
        expect(shoppingFacade.addProductToShoppingCart({ value: -1 }, 1)).toBeFalsy();
    });

    test("Should fail to add negative quantity of product to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(product1Id, -10)).toBeFalsy();
    });

    test("Should fail to add zero quantity of product to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(product1Id, 0)).toBeFalsy();
    });

    test("Should add product to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(product1Id, 1)).toBeTruthy();
    });

    test("Should add different products to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(product1Id, 1)).toBeTruthy();
        expect(shoppingFacade.addProductToShoppingCart(product2Id, 1)).toBeTruthy();
        expect(shoppingFacade.getProductQuantityFromShoppingCart(product1Id)).toBe(1);
        expect(shoppingFacade.getProductQuantityFromShoppingCart(product2Id)).toBe(1);
    });

    test("Should add more of same product to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(product1Id, 1)).toBeTruthy();
        expect(shoppingFacade.addProductToShoppingCart(product1Id, 1)).toBeTruthy();
        expect(shoppingFacade.getProductQuantityFromShoppingCart(product1Id)).toBe(2);
    });

    test("Should fail to remove invalid product to shopping cart", (): void => {
        expect(shoppingFacade.removeProductToShoppingCart(nonExistingProductId)).toBeFalsy();
    });

    test("Should fail to remove product from empty shopping cart", (): void => {
        expect(shoppingFacade.removeProductToShoppingCart(product1Id)).toBeFalsy();
    });

    test("Should remove product from shopping cart", (): void => {
        shoppingFacade.addProductToShoppingCart(product1Id, 2);
        shoppingFacade.addProductToShoppingCart(product2Id, 2);
        expect(shoppingFacade.removeProductToShoppingCart(product1Id)).toBeTruthy();
        expect(shoppingFacade.getProductQuantityFromShoppingCart(product1Id)).toBe(0);
        expect(shoppingFacade.getProductQuantityFromShoppingCart(product2Id)).toBe(2);
    });

    test("Should fail to create order from empty shopping cart", (): void => {
        expect(shoppingFacade.createOrderFromShoppingCart()).toBeUndefined();
    });

    test("Should create order from shopping cart", (): void => {
        shoppingFacade.addProductToShoppingCart(product1Id, 2);
        shoppingFacade.addProductToShoppingCart(product2Id, 1);
        const order = shoppingFacade.createOrderFromShoppingCart();
        expect(order).toBeDefined();
        expect(order?.calculateTotalPrice()).toBe(40);
        expect(order?.status).toBe(OrderStatus.PENDING);
        expect(inventory.findProduct(product1Id)?.quantity).toBe(98);
        expect(inventory.findProduct(product2Id)?.quantity).toBe(49);
    });

    test("Should fail to cancel non-existing order", (): void => {
        expect(shoppingFacade.cancelPlacedOrder({ value: 10 })).toBeFalsy();
    });

    // test("Should cancel existing order", (): void => {
    //     shoppingFacade.addProductToShoppingCart(product2Id, 1);
    //     const order = shoppingFacade.createOrderFromShoppingCart();
    //     console.log(order);// Palced Order ID should be passed
    //     expect(shoppingFacade.cancelPlacedOrder({ value: 1 })).toBeTruthy(); // TODO check it this is testing correctly
    // });

    test("Should fail to apply invalid discount code to order", (): void => {
        // expect(shoppingFacade.createOrderFromShoppingCart()).toBeUndefined();
    });

    test("Should apply valid discount code to order", (): void => {
        // expect(shoppingFacade.createOrderFromShoppingCart()).toBeUndefined();
    });

    test("Should apply shipping cost to total price", (): void => {
        // expect(shoppingFacade.createOrderFromShoppingCart()).toBeUndefined();
    });

    test("Should apply tax to total price", (): void => {
        // expect(shoppingFacade.createOrderFromShoppingCart()).toBeUndefined();
    });
})