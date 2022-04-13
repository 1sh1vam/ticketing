import { OrderStatus } from '@simtix/ticketing-common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('throws not found error if trying do delete which does not exists', async () => {
    const orderId = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .delete(`/api/orders/${orderId}`)
        .set('Cookie', global.signin())
        .send()
        .expect(404);
});

it('throws not authorized error if trying to delete others order', async () => {
    const ticket = Ticket.build({
        title: 'MI vs KXIP',
        price: 245,
    });
    await ticket.save();

    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({
            ticketId:ticket.id,
        })
        .expect(201);

    await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', global.signin())
        .send()
        .expect(401);
});

it('deletes the order', async () => {
    const ticket = Ticket.build({
        title: 'MI vs KXIP',
        price: 245,
    });
    await ticket.save();

    const user = global.signin();

    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({
            ticketId:ticket.id,
        })
        .expect(201);

    await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204);

    const { body: fetchedOrder } = await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(200);

    expect(fetchedOrder.status).toEqual(OrderStatus.Cancelled);
});