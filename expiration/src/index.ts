const start = async () => {
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID is required')
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID is required')
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL is required')
    }

    try {

    } catch (err) {
        console.log('Error connecting to nats in expiration service');
    }
}

start();