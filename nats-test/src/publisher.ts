import nats from 'node-nats-streaming';

const stan = nats.connect('ticketing', 'test', {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('Publisher connected to NATS');
});