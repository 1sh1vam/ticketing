import request from 'supertest';
import { app } from '../../app';

it('returns a 404 error when ticket is not found', async () => {
    await request(app)
        .get('/api/tickets/in2138n213u')
        .send()
        .expect(404)
});

it('returns the ticket if ticket is found', async () => {
    const title = 'Csk vs Kkr';
    const price = 2345;

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price,
        })
        .expect(201);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
});