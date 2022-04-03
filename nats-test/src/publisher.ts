import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

const stan = nats.connect('ticketing', 'test', {
    url: 'http://localhost:4222',
});

stan.on('connect', async () => {
    console.log('Publisher connected to NATS');

    const publisher = new TicketCreatedPublisher(stan);
    await publisher.publish({
        id: 'rn132',
        title: 'CSK vs PBKXI',
        price: 3500,
    });

    // const data = JSON.stringify({
    //     id: '124gvhj324',
    //     title: 'RCB vs KXIP',
    //     price: 2400,
    // });

    // stan.publish('ticket:created', data, () => {
    //     console.log('Event published');
    // });
});