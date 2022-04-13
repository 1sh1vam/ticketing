import request from 'supertest';
import { app } from '../../app';

it('throws an 400 (bad request error) when trying to get the orders', async () => {
    await request(app)
        .get('/api/orders')
        .expect(400);
});