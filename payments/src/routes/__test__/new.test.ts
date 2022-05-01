import { OrderStatus } from '@simtix/ticketing-common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order';

it('throws 404 if orderId does not exists', async () => {
    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            token: 'dfds',
            orderId: new mongoose.Types.ObjectId().toHexString(),
        })
        .expect(404);
});

it('throws a 401 if user is not the one who created order', async () => {
    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 20,
        version: 0,
        userId: 'derewr',
        status: OrderStatus.Created,
    });
    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            orderId: order.id,
            token: 'sdfsdg',
        })
        .expect(401);
});
