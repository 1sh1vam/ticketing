import { PaymentCreatedEvent, Publisher, Subjects } from "@simtix/ticketing-common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}