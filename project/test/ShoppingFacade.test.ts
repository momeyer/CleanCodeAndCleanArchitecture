import ECommerce from "../src/ECommerce";
import { Order, OrderStatus } from "../src/Order";
import PlacedOrders from "../src/Orders";
import ShoppingFacade from "../src/ShoppingFacade";

class FakePlacedOrders implements PlacedOrders {
    add(order: Order): boolean {
        return false;
    }
    updateStatus(orderID: number, status: OrderStatus): boolean {
        return (orderID === 1);
    }
}

describe("Shopping Facade E2E", (): void => {
    let placedOrders = new FakePlacedOrders();
    let ecommerce = new ECommerce(placedOrders);
    let shoppingFacade = new ShoppingFacade(ecommerce);

    test("cancel non-existing order", (): void => {
        expect(shoppingFacade.cancelPlacedOrder(10)).toBeFalsy();
    });

    test("cancel existing order", (): void => {

        expect(shoppingFacade.cancelPlacedOrder(1)).toBeTruthy();
    });

})