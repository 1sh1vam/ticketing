import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@simtix/ticketing-common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./query-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id);

        if (!ticket) throw new Error('Ticket does not exists');

        ticket.set({ orderId: data.id });
        await ticket.save();

        msg.ack();
    }
}