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

    const options = stan
        .subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable()
        .setDurableName('accounting-service');

    // setDurableOptions will not work if there is no queue group in nats.
    // The reason why it's not going to work is when we restart every time nats
    // assumes as this service is down it' not going to be up again hence removes
    // the durable event history from nat. When we use queue group then nats assumes
    // that this service might come back after some time and doesn't remove the event history for that service
    const subscription = stan.subscribe(
      'ticket:created',
      'queue-group-name',
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
