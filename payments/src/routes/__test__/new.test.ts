import { OrderStatus } from '@simtix/ticketing-common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order';
import { stripe } from '../../stripe';

jest.mock('../../stripe.ts');

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

it('throws 400 if order is cancelled', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 30,
        version: 0,
        userId,
        status: OrderStatus.Cancelled,
    });
    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin(userId))
        .send({
            orderId: order.id,
            token: 'dfdfgdfg',
        })
        .expect(400);
});

it('returns a 201 with valid inputs', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        price: 23,
        userId,
        status: OrderStatus.Created,
    });
    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin(userId))
        .send({
            token: 'dfdgd',
            orderId: order.id
        })
        .expect(201);

    const stripeOptions = (stripe.paymentIntents.create as jest.Mock).mock.calls[0][0];

    console.log(stripeOptions);

    expect(stripeOptions.currency).toEqual('usd');
    expect(stripeOptions.amount).toEqual(order.price * 100);
});