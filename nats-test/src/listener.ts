import { randomBytes } from 'crypto';
import nats from 'node-nats-streaming';
import { TicketCreatedListener } from './events/ticket-created-listner';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('listener connected to the NATS');

    stan.on('close', () => {
        console.log('NATS connection closed!')
        process.exit();
    });

    new TicketCreatedListener(stan).listen();
});

// This will only work when a subsriber is interrupted from terminal or using ctrl+c
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());