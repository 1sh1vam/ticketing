import { app } from "../../app";
import request from 'supertest';
import mongoose from "mongoose";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";

it('returns a 401 unauthorized error if trying to create an order without being logged in', async () => {
    await request(app)
        .post('/api/orders')
        .send({ ticketId: '23dre234' })
        .expect(401);
});

it('returns bad request error if user sends create order with invalid ticket id', async () =>{
    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({})
        .expect(400);

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ ticketId: '712364' })
        .expect(400);
});

it('returns not found 404 error when ticket trying to order is not present', async () => {
    const ticketId = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ ticketId })
        .expect(404);
});

it('returns bad request 400 when ticket is already reserved', async () => {
    const ticket = Ticket.build({
        title: 'DC vs KKR',
        price: 2345
    });
    await ticket.save();

    const order = Order.build({
        ticket,
        userId: 'lasndasd',
        status: OrderStatus.Created,
        expiresAt: new Date(),
    });

    await order.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({
            ticketId: ticket.id,
        })
        .expect(400);
});

it('successfully reserves a ticket', async () => {
    const ticket = Ticket.build({
        title: 'KKR vs DC',
        price: 234
    });
    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({
            ticketId: ticket.id,
        })
        .expect(201);
});