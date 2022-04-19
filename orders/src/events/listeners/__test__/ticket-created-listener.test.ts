import { TicketCreatedEvent } from "@simtix/ticketing-common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper"
import { TicketCreatedListener } from "../ticket-created-listener"

const setup = async () => {
    // 1. Create a listener
    const listener = new TicketCreatedListener(natsWrapper.client);

    // 2. Create a fake data object
    const data: TicketCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'Concert',
        price: 300,
        userId: 'assdj34j',
        version: 0,
    }

    // 3. Create a fake msg
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    }

    // Return all these
    return { listener, data, msg };
}

it('creates and savea ticket',async () => {
    const { listener, data, msg } = await setup();

    // Call the onMessage with data and msg
    await listener.onMessage(data, msg);

    // make an assertio to make sure the ticket was created
    const ticket = await Ticket.findById(data.id);
    expect(ticket).toBeDefined();
    expect(ticket!.title).toEqual(data.title);
    expect(ticket!.price).toEqual(data.price);
});

it('acks the message',async () => {
    const { data, msg, listener } = await setup();

    // Call the onMessage with data nd msg
    await listener.onMessage(data, msg);

    // Make an assertion to make sure act function was called
    expect(msg.ack).toHaveBeenCalled();
});