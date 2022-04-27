import { OrderCreatedEvent, OrderStatus } from "@simtix/ticketing-common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../../models/order";
import { natsWrapper } from "../../../nats-wrapper"
import { OrderCreatedListener } from "../order-created-listener"

const setup = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);

    const data:OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Created,
        expiresAt: '334543',
        userId: '34',
        version: 0,
        ticket: {
            id: '445345',
            price: 2340,
        },
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    }

    return { listener, data, msg};
}

it('replicates the order info', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const order = await Order.findById(data.id);

    expect(order).not.toBe(null);
    expect(order!.id).toEqual(data.id);
    expect(order!.price).toEqual(data.ticket.price);
    expect(order!.status).toEqual(data.status);
});

it('acks the msg', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});