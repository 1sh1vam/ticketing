import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('throws not found error if ticket does not exists', async () => {
    const orderId = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .get(`/api/orders/${orderId}`)
        .set('Cookie', global.signin())
        .send()
        .expect(404)
});

it('throws unauthorized error if accessing order of other users', async () => {
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'KXIP vs MI',
        price: 3498,
    });

    await ticket.save();

    const { body: order} = await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({
            ticketId: ticket.id,
        })
        .expect(201);

    await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', global.signin())
        .send()
        .expect(401);
});

it('throws unauthorized error if accessing order of other users', async () => {
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'KXIP vs MI',
        price: 3498,
    });

    await ticket.save();

    const user = global.signin();

    const { body: order} = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({
            ticketId: ticket.id,
        })
        .expect(201);

    const { body: fetchedOrder } =  await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(200);

    expect(fetchedOrder.id).toEqual(order.id);
});