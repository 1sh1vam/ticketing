import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', 'test', {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('Publisher connected to NATS');

    const data = JSON.stringify({
        id: '124gvhj324',
        title: 'RCB vs KXIP',
        price: 2400,
    });

    stan.publish('ticket:created', data, () => {
        console.log('Event published');
    });
});