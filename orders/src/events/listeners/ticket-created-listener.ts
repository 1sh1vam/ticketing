import { Listener, Subjects, TicketCreatedEvent } from "@simtix/ticketing-common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName = 'orders-service';

    async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        const ticket = Ticket.build({
            title: data.title,
            price: data.price,
        });

        await ticket.save();

        msg.ack();
    }
}