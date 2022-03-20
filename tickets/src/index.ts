import { app } from "./app";
import mongoose from 'mongoose';

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('Jwt key must be defined');
    }

    try {
        await mongoose.connect('mongodb://tickets-mongo-srv:27017/tickets')
    } catch(e) {
        console.log('error connecting to mongo', e);
    }

    app.listen(3000, () => {
        console.log('listening on port 3000');
    });
}

start();