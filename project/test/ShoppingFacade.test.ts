import { anything, instance, mock, when } from "ts-mockito";
import ECommerce from "../src/ECommerce";
import { OrderStatus } from "../src/Order";
import PlacedOrders from "../src/Orders";
import ShoppingFacade from "../src/ShoppingFacade";

describe("Shopping Facade E2E", (): void => {
    // Creating mock
    let mockedPlacedOrders: PlacedOrders = mock<PlacedOrders>();

    // Getting instance from mock
    let placedOrders: PlacedOrders = instance(mockedPlacedOrders);

    let ecommerce = new ECommerce(placedOrders);
    let shoppingFacade = new ShoppingFacade(ecommerce);

    test("cancel non-existing order", (): void => {
        when(mockedPlacedOrders.updateStatus(anything(), anything())).thenReturn(false);
        expect(shoppingFacade.cancelPlacedOrder(10)).toBeFalsy();
    });

    test("cancel existing order", (): void => {
        when(mockedPlacedOrders.updateStatus(1, anything())).thenReturn(true);
        expect(shoppingFacade.cancelPlacedOrder(1)).toBeTruthy();
    });

})