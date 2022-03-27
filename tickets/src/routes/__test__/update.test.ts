import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

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

it('returns a 400 bad request error if sent invalid parameters', async () => {
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

it('returns a 401 if trying to modify a ticket which is not owned by the user', async () => {

});

it('updates the ticket data', async () => {

});