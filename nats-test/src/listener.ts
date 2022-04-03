import { randomBytes } from 'crypto';
import nats, { Message, Stan } from 'node-nats-streaming';

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


abstract class Listener {
    abstract subject: string;
    abstract queueGroupName: string;
    abstract onMessage(data: any, msg: Message): void;
    private client: Stan;
    protected ackWait = 5 * 1000;

    constructor(client: Stan) {
        this.client = client;
    }

    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    }

    listen() {
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        );

        subscription.on('message', (msg: Message) => {
            console.log(`Message received ${this.subject} / ${this.queueGroupName}`)

            const parsedData = this.parseMessage(msg);

            this.onMessage(parsedData, msg)
        });
    }

    parseMessage(msg: Message) {
        const data = msg.getData();

        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf-8'));
    }
}