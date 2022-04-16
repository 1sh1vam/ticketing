import { OrderCreatedEvent, Publisher, Subjects } from "@simtix/ticketing-common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}