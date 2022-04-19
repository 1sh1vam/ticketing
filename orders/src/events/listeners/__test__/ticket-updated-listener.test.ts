import { TicketUpdatedEvent } from "@simtix/ticketing-common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper"
import { TicketUpdatedListener } from "../ticket-updated-listener"

const setup = async () => {
    // 1. Create a ticketUpdatedListener
    const listener = new TicketUpdatedListener(natsWrapper.client);

    // 2. crate a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'Concert',
        price: 200,
    });
    await ticket.save();

    // 3. Create fake data object
    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        title: 'concert 23',
        price: 23,
        version: ticket.version + 1,
        userId: '1221df',
    };

    // 4. Create a fake msg object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    }

    // 5. Return all of these
    return { data, listener, ticket, msg };
};