import mongoose from "mongoose";
import { app } from "./app";
import { OrderCancelledListener } from "./events/listener/order-cancelled-listener";
import { OrderCreatedListener } from "./events/listener/order-created-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY is required');
    }
    if (!process.env.STRIPE_KEY) {
        throw new Error('STRIPE_KEY is required');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is required');
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID is required');
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID is required');
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL is required');
    }

    try {
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed');
            process.exit();
        });

        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        new OrderCreatedListener(natsWrapper.client).listen();
        new OrderCancelledListener(natsWrapper.client).listen();

        await mongoose.connect(process.env.MONGO_URI);
    } catch(err) {
        console.log('failed to connect to the database', err);
    }

    app.listen(3000, () => {
        console.log('listening on port 3000');
    });
}

start();