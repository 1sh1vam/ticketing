import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';

it('returns a 404 error if ticket not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'Random',
            price: 23
        })
        .expect(404);
});

it('returns a 401 error if not logged in', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'Random',
            price: 23
        })
        .expect(401);
});

it('returns a 401 if trying to modify a ticket which is not owned by the user', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'asf',
            price: 23
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'new title',
            price: 100
        })
        .expect(401);

    const newResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();

    expect(newResponse.body.title).toEqual(response.body.title);
    expect(newResponse.body.price).toEqual(response.body.price);
});

it('returns a 400 bad request error if sent invalid parameters', async () => {
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'Random',
            price: 234,
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 10
        })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'Updated',
            price: -10
        })
        .expect(400);
});

it('updates the ticket data', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'Hello',
            price: 10,
        })
        .expect(201);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'Hello1',
            price: 20,
        })
        .expect(200);

    const updateResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send()

    expect(updateResponse.body.title).toEqual('Hello1');
    expect(updateResponse.body.price).toEqual(20);
});

it('publishes an event', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'Hello',
            price: 10,
        })
        .expect(201);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'Hello1',
            price: 20,
        })
        .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
})