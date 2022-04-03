import { Subjects, TicketCreatedEvent, Publisher } from "@simtix/ticketing-common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated;
}