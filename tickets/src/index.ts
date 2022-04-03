import { app } from "./app";
import mongoose from 'mongoose';
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('Jwt key must be defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    try {
        await natsWrapper.connect('ticketing', 'jsdf4', 'http://nats-srv:4222');
        await mongoose.connect(process.env.MONGO_URI);
    } catch(e) {
        console.log('error connecting to mongo', e);
    }

    app.listen(3000, () => {
        console.log('listening on port 3000');
    });
}

start();