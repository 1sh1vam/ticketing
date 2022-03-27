import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from 'jsonwebtoken';

declare global {
    var signin: () => string[];
}

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'jewrwer'
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = () => {
    // Step: 1 create a payload for jwt
    const id = new mongoose.Types.ObjectId().toHexString();
    const payload = { id, email: 'somerandom@test.com' };

    // Step: 2 create a jwt token
    const token = jwt.sign(payload, process.env.JWT_KEY!)

    // Step 3: Creating session object { jwt: MY_JWT }
    const session = { jwt: token };

    // Step 4: Turn session into a json
    const sessionJson = JSON.stringify(session);

    // Step 5: Encoding Json into a base64 string
    const base64 = Buffer.from(sessionJson).toString('base64');

    // return a string thats the cookie with encoded data
    return [`session=${base64}`];
}
