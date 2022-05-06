import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

jest.mock('../nats-wrapper');

declare global {
    var signin: (userId?: string) => string[];
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
    await mongoose.connection.close();
    await mongod.stop()
});

global.signin = (userId?: string) => {
    const id = userId || new mongoose.Types.ObjectId().toHexString();
    const payload = { id, email: 'test@test.com' };

    const token = jwt.sign(payload, process.env.JWT_KEY!);

    const session = { jwt: token };

    const sessionJson = JSON.stringify(session);

    const base64 = Buffer.from(sessionJson).toString('base64');

    return [`session=${base64}`];
}
