import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

jest.mock('../nats-wrapper');

declare global {
    var signin: () => string[];
}

let mongod: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'sfdsg';

    mongod = await MongoMemoryServer.create();

    const mongodb_uri = mongod.getUri();
    await mongoose.connect(mongodb_uri);
});

beforeEach(async () => {
    jest.clearAllMocks();

    const collections = await mongoose.connection.db.collections();

    for(const collection of collections) {
        await collection.deleteMany({});
    };
});

afterAll(async () => {
    await mongod.stop()
    await mongoose.connection.close();
});

global.signin = () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const payload = { id, email: 'test@test.com' };

    const token = jwt.sign(payload, process.env.JWT_KEY!);

    const session = { jwt: token };

    const sessionJson = JSON.stringify(session);

    const base64 = Buffer.from(sessionJson).toString('base64');

    return [`session=${base64}`];
}
