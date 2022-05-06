import { Order } from "../../../models/order";
import { Ticket } from '../../../models/ticket';
import { natsWrapper } from "../../../nats-wrapper"
import { PaymentCreatedListener } from "../payment-created-listener"
import { OrderStatus, PaymentCreatedEvent } from "@simtix/ticketing-common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

const setup = async () => {
    const listener = new PaymentCreatedListener(natsWrapper.client);

    const ticket = Ticket.build({
        title: 'new match',
        price: 230,
        id: new mongoose.Types.ObjectId().toHexString(),
    });
    await ticket.save();

    const order = Order.build({
        userId: 'dsfjt43jfg',
        status: OrderStatus.Created,
        expiresAt: new Date(),
        ticket,
    });
    await order.save();

    const data: PaymentCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        orderId: order.id,
        stripeId: 'dsffgfg',
    }

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    }

    return {
        listener,
        ticket,
        order,
        data,
        msg
    }
}

it('makes order complete', async () => {
    const { listener, order, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Complete);
});

it('acks the msg', async () => {
    const { listener, order, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});