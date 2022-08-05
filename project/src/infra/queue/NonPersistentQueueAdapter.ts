import DomainEvent from "../../domain/event/DomainEvent";
import Queue from "./Queue";

export default class NonPersistentQueueAdapter implements Queue {
  consumers: Consumer[];

  constructor() {
    this.consumers = [];
  }

  async consume(eventName: string, callback: any): Promise<void> {
    console.log("CONSUME");
    this.consumers.push({ eventName, callback });
  }
  async publish(domainEvent: DomainEvent): Promise<void> {
    for (const consumer of this.consumers) {
      console.log("PUBLISH");
      if (consumer.eventName === domainEvent.name) {
        console.log("callbac");
        await consumer.callback(domainEvent);
      }
    }
  }
}

type Consumer = {
  eventName: string;
  callback: any;
};
