import { app } from "../../app";
import request from 'supertest';

it('returns a 201 on successfull signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'asdfn@gmi.com',
            password: 'Password'
        })
        .expect(201)
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: '1223',
            password: 'randombytes',
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '12'
        })
        .expect(400);
});

it('returns a 400 with empty email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'test@123'
        })
        .expect(400);
});

it('disallows the duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test@123'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test@123'
        })
        .expect(400);
});

it('sets a cookie after a successfull signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test@123'
        });
    console.log('pr', process.env.NODE_ENV)
    expect(response.get('Set-Cookie')).toBeDefined();
});