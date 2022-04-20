import { OrderCreatedEvent, OrderStatus } from "@simtix/ticketing-common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper"
import { OrderCreatedListener } from "../order-created-listener"

const setup = async () => {
    // 1. Create an OrderCreatedListener
    const listener = new OrderCreatedListener(natsWrapper.client);

    // 2. create a ticket
    const ticket = Ticket.build({
        title: 'PBKS vs DC',
        price: 234,
        userId: '234',
    });
    await ticket.save();

    // 3. Create the fake data
    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Created,
        expiresAt: '1erewr',
        userId: '2323',
        version: 0,
        ticket: {
            id: ticket.id,
            price: ticket.price,
        }
    }

    // 4. Create the msg object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    }

    return { listener, ticket, data, msg }
};

it('sets the orderId on the ticket', async () => {
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).toEqual(data.id);
});

it('does not ack msg if ticket not found',async () => {
    const { listener, data, msg } = await setup();

    const ticketId = new mongoose.Types.ObjectId().toHexString();
    data.ticket.id = ticketId;

    try {
        await listener.onMessage(data, msg);
    } catch(e) {

    }

    expect(msg.ack).not.toHaveBeenCalled();
});

it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});