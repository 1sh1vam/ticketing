import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

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

