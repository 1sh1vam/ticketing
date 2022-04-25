import mongoose from "mongoose";
import { Order } from "../../../models/order";
import { natsWrapper } from "../../../nats-wrapper"
import { ExpirationCompleteListener } from "../expiration-complete-listener"
import {  ExpirationCompleteEvent, OrderStatus } from "@simtix/ticketing-common";
import { Ticket } from "../../../models/ticket";
import { Message } from "node-nats-streaming";

const setup = async () => {
    const listener = new ExpirationCompleteListener(natsWrapper.client);

    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'CSK vs PBKS',
        price: 3400,
    });
    await ticket.save();
    const order = Order.build({
        status: OrderStatus.Created,
        userId: 'f4343',
        expiresAt: new Date(),
        ticket,
    });
    await order.save();

    const data: ExpirationCompleteEvent['data'] = {
        orderId: order.id,
    };

    //  @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    }

    return { listener, ticket, order, data, msg };
}