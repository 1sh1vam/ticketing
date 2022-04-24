import Queue from 'bull';

interface Payload {
    orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
    redis: {
        host: process.env.REDIS_HOST,
    }
});


expirationQueue.process(async (job) => {
    console.log('Order expiry expiration complete to be processed');
});

export { expirationQueue };