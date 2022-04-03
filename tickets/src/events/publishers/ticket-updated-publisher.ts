import { Subjects, Publisher, TicketUpdatedEvent } from "@simtix/ticketing-common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}