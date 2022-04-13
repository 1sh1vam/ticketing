import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('throws an 401 (bad request error) when trying to get the orders', async () => {
    await request(app)
        .get('/api/orders')
        .expect(401);
});

const createTicket = async () => {
    const ticket = Ticket.build({
        title: 'Concert',
        price: 200,
    });

    await ticket.save();

    return ticket;
}

it('lists all the orders of the user', async () => {
    // 1. Create three tickets
    const ticket1 = await createTicket();
    const ticket2 = await createTicket();
    const ticket3 = await createTicket();

    const userOne = global.signin();
    const userTwo = global.signin();
    // 2. Crete one order for user1
    const { body: order1 } = await request(app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({ ticketId: ticket1.id })
        .expect(201);

    // 3. Create two order for user 2
    const { body: order2 } = await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ ticketId: ticket2.id })
        .expect(201);

    const { body: order3 } = await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ ticketId: ticket3.id })
        .expect(201);

    const response = await request(app)
        .get('/api/orders')
        .set('Cookie', userTwo)
        .expect(200);

    expect(response.body.length).toEqual(2);
    expect(response.body[0].id).toEqual(order2.id);
    expect(response.body[1].id).toEqual(order3.id);
});