import DomainEvent from "../../domain/event/DomainEvent";

export default interface Queue {
  consume(eventName: "orderPlaced" | "orderCanceled", callback: any): Promise<void>;
  publish(domainEvent: DomainEvent): Promise<void>;
}
