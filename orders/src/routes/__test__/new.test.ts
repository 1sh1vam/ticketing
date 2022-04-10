import { app } from "../../app";
import request from 'supertest';
import mongoose from "mongoose";

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