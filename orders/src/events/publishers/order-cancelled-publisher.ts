import { OrderCancelledEvent, Publisher, Subjects } from "@simtix/ticketing-common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}