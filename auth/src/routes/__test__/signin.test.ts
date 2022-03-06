import { app } from "../../app";
import request from 'supertest';

it('returns a 400 if invalid email or password is provided', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test',
            password: '23dfdsf',
        })
        .expect(400);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '',
        })
        .expect(400)
});

it('returns a 400 if empty email and password is provided',async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            password: 'ssdfds',
        })
        .expect(400);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
        })
        .expect(400);
});

it('fails when an email which does not exists is provided', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '12343'
        })
        .expect(400);
});

it('fails when an incorrect password is provided', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test@123',
        })
        .expect(201)

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'random'
        })
        .expect(400);
});

it('responds with a cookie when given with valid credentials',async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test@123'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'test@123'
        })
        .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined();
})
