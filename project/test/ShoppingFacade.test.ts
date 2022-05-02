import ECommerce from "../src/ECommerce";
import { OrderStatus } from "../src/Order";
import { NonPersistentPlacedOrder } from "../src/Orders";
import { ProductId } from "../src/Product";
import { NonPersistentProductInventory } from "../src/ProductInventory";
import ShoppingFacade from "../src/ShoppingFacade";
import { camera, guitar } from "./ProductSamples";

describe("Shopping Facade Acceptance", (): void => {
    let mockedPlacedOrders: NonPersistentPlacedOrder;
    let placedOrders: NonPersistentPlacedOrder;
    let nonExistingProductId: ProductId = { value: 100 };

    let validCPF = "111.444.777-35";
    let inventory: NonPersistentProductInventory;

    let ecommerce: ECommerce;
    let shoppingFacade: ShoppingFacade;

    beforeEach((): void => {
        placedOrders = new NonPersistentPlacedOrder();

        inventory = new NonPersistentProductInventory();

        ecommerce = new ECommerce(placedOrders, inventory);
        shoppingFacade = new ShoppingFacade(ecommerce);
        inventory.addProduct(camera, 100);
        inventory.addProduct(guitar, 50);
    })


    test("Should fail to add non-existing product to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(nonExistingProductId, 1)).toBeFalsy();
    });

    test("Should fail to add invalid product Id to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart({ value: 0 }, 1)).toBeFalsy();
        expect(shoppingFacade.addProductToShoppingCart({ value: -1 }, 1)).toBeFalsy();
    });

    test("Should fail to add negative quantity of product to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(camera.id, -10)).toBeFalsy();
    });

    test("Should fail to add zero quantity of product to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(camera.id, 0)).toBeFalsy();
    });

    test("Should add product to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(camera.id, 1)).toBeTruthy();
    });

    test("Should add different products to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(camera.id, 1)).toBeTruthy();
        expect(shoppingFacade.addProductToShoppingCart(guitar.id, 1)).toBeTruthy();
        expect(shoppingFacade.getProductQuantityFromShoppingCart(camera.id)).toBe(1);
        expect(shoppingFacade.getProductQuantityFromShoppingCart(guitar.id)).toBe(1);
    });

    test("Should add more of same product to shopping cart", (): void => {
        expect(shoppingFacade.addProductToShoppingCart(camera.id, 1)).toBeTruthy();
        expect(shoppingFacade.addProductToShoppingCart(camera.id, 1)).toBeTruthy();
        expect(shoppingFacade.getProductQuantityFromShoppingCart(camera.id)).toBe(2);
    });

    test("Should fail to remove invalid product to shopping cart", (): void => {
        expect(shoppingFacade.removeProductToShoppingCart(nonExistingProductId)).toBeFalsy();
    });

    test("Should fail to remove product from empty shopping cart", (): void => {
        expect(shoppingFacade.removeProductToShoppingCart(camera.id)).toBeFalsy();
    });

    test("Should remove product from shopping cart", (): void => {
        shoppingFacade.addProductToShoppingCart(camera.id, 2);
        shoppingFacade.addProductToShoppingCart(guitar.id, 2);
        expect(shoppingFacade.removeProductToShoppingCart(camera.id)).toBeTruthy();
        expect(shoppingFacade.getProductQuantityFromShoppingCart(camera.id)).toBe(0);
        expect(shoppingFacade.getProductQuantityFromShoppingCart(guitar.id)).toBe(2);
    });

    test("Should fail to create order from empty shopping cart", (): void => {
        expect(shoppingFacade.createOrderFromShoppingCart(validCPF)).toBeUndefined();
    });

    test("Should fail to create order with invalid cpf", (): void => {
        shoppingFacade.addProductToShoppingCart(guitar.id, 2);
        expect(() => shoppingFacade.createOrderFromShoppingCart("111.111")).toThrow(new Error("Invalid CPF"));
    });

    test("Should create order from shopping cart", (): void => {
        shoppingFacade.addProductToShoppingCart(camera.id, 2);
        shoppingFacade.addProductToShoppingCart(guitar.id, 1);
        const order = shoppingFacade.createOrderFromShoppingCart(validCPF);
        expect(order).toBeDefined();
        expect(order?.calculateTotalPrice()).toBe(92); //  + 0.05 tax and 10$ shipping cost
        expect(order?.status).toBe(OrderStatus.PENDING);
        expect(inventory.findProduct(camera.id)?.quantity).toBe(98);
        expect(inventory.findProduct(guitar.id)?.quantity).toBe(49);
        expect(shoppingFacade.eCommerce.shoppingCart.isEmpty).toBeTruthy();
    });

    test("Should fail to cancel non-existing order", (): void => {
        expect(shoppingFacade.cancelPlacedOrder({ value: 10 })).toBeFalsy();
    });

    test("Should cancel existing order", (): void => {
        shoppingFacade.addProductToShoppingCart(camera.id, 1);
        shoppingFacade.addProductToShoppingCart(guitar.id, 1);
        const order = shoppingFacade.createOrderFromShoppingCart(validCPF);
        expect(shoppingFacade.cancelPlacedOrder(order!.id)).toBeTruthy(); // TODO check it this is testing correctly
        expect(placedOrders.getOrder(order!.id)?.status).toBe(OrderStatus.CANCELLED); // Palced Order ID should be passed
    });

    test("Should fail to apply invalid discount code to order", (): void => {
        expect(shoppingFacade.applyDiscountCodeToShoppingCart("Get100")).toBeFalsy();
    });

    test("Should apply correct shipping cost", (): void => {
        shoppingFacade.addProductToShoppingCart(guitar.id, 1);
        const order = shoppingFacade.createOrderFromShoppingCart(validCPF);
        expect(order?.calculateTotalPrice()).toBe(51); //  + 0.05 tax and 30$ shipping cost
    });

    test("Should apply valid discount code to order", (): void => {
        shoppingFacade.addProductToShoppingCart(camera.id, 2);
        shoppingFacade.addProductToShoppingCart(guitar.id, 1);
        shoppingFacade.applyDiscountCodeToShoppingCart("Get20");
        const order = shoppingFacade.createOrderFromShoppingCart(validCPF);
        expect(order?.calculateTotalPrice()).toBe(83.60);
    });

})