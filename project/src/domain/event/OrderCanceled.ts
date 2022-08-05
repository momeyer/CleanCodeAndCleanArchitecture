import { Order } from "../entity/Order";
import DomainEvent from "./DomainEvent";

export default class OrderCanceled implements DomainEvent {
  name = "orderCanceled";

  constructor(readonly order: Order) {}
}
