import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY is required');
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
        await mongoose.connect(process.env.MONGO_URI);
    } catch(err) {
        console.log('failed to connect to the database', err);
    }

    app.listen(3000, () => {
        console.log('listening on port 3000');
    });
}

start();