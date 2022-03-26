import request from 'supertest';
import { app } from '../../app';

it('has a route handler listening for /api/tickets post request', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});
    console.log(response.status);
    expect(response.status).not.toEqual(404);
});

it('can only be accessed if user is signed in', async () => {
    return request(app)
        .post('/api/tickets')
        .send({})
        .expect(401);
});

it('returns a status code other than 401 if user is signed in', async () => {

});

it('returns an error if invalid title is provided', async () => {

});

it('returns an error if invalid price is provided', async () => {

});

it('creates a ticket with valid inputs', async () => {

});