import request from 'supertest';
import { app } from '../../app';

it('Returns 401 if trying to get current user without login',async () => {
    return request(app)
        .get('/api/users/currentUser')
        .send()
        .expect(401);
});

it('responds with details about the current user', async () => {
    const cookie = await global.signin();

    const response = await request(app)
        .get('/api/users/currentUser')
        .set('Cookie', cookie)
        .send()
        .expect(400)

    expect(response.body.currentUser.email).toEqual('test@test.com');
});
