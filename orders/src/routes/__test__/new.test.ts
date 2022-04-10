import { app } from "../../app";
import request from 'supertest';

it('returns a 401 unauthorized error if trying to create an order without being logged in', async () => {
    await request(app)
        .post('/api/orders')
        .send({ ticketId: '23dre234' })
        .expect(401);
});