import request from 'supertest';
import { app } from '../../app';

it('returns a 401 if trying to signout', async () => {
    return request(app)
        .post('/api/users/signout')
        .send()
        .expect(401);
});

it('clears the cookie after signing out', async () => {
    const authResponse = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test@123'
        })
        .expect(201);

    const cookie = authResponse.get('Set-Cookie');

    const response = await request(app)
        .post('/api/users/signout')
        .set('Cookie', cookie) // setting the cookie that we get form the signup
        .send({})
        .expect(200);

    expect(response.get('Set-Cookie')[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
});

