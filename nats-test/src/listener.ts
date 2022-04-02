import nats from 'node-nats-streaming';

const stan = nats.connect('ticketing', 'listener', {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('listener connected to the NATS');
});