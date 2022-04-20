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