import request from 'supertest';
import { app } from '../../app';

it('Returns 401 if trying to get current user without login',async () => {
    return request(app)
        .get('/api/users/currentUser')
        .send()
        .expect(401);
});

it('responds with details about the current user', async () => {
    const authResponse = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test@123',
        })
        .expect(201);

    const cookie = authResponse.get('Set-Cookie');

    const response = await request(app)
        .get('/api/users/currentUser')
        .set('Cookie', cookie)
        .send()
        .expect(200)

    expect(response.body.currentUser.email).toEqual('test@test.com');
});
