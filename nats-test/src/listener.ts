import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', 'listener', {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('listener connected to the NATS');

    const subscription = stan.subscribe('ticket:created');

    subscription.on('message', () => {
        console.log('Message received');
    });
});