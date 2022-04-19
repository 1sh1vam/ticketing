import { TicketCreatedEvent } from "@simtix/ticketing-common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
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