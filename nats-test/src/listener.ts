import { randomBytes } from 'crypto';
import nats, { Message } from 'node-nats-streaming';

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

    const options = stan.subscriptionOptions().setManualAckMode(true);

    const subscription = stan.subscribe(
      'ticket:created',
      'orders-service-queue-group',
      options
    );

    subscription.on('message', (msg: Message) => {
        const data = msg.getData();

        if (typeof data === 'string') {
            console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
        }

        msg.ack();
    });
});

// This will only work when a subsriber is interrupted from terminal or using ctrl+c
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
