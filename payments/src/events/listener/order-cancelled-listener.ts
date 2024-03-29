import { Listener, OrderCancelledEvent, OrderStatus, Subjects } from "@simtix/ticketing-common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { queryGroupName } from "./query-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;

    queueGroupName = queryGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        const order = await Order.findByEvent({ id: data.id, version: data.version });

        if (!order) {
            throw new Error('Order not found');
        }

        order.set({ status: OrderStatus.Cancelled });
        await order.save();

        msg.ack();
    }
}