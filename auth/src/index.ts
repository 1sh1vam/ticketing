import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import cookieSession from 'cookie-session';


const app = express();
app.set('trust proxy', true);

app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: true, // This option is to tell that set cookie only if connection is a secure connection.
}))

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter)

// Throwing an error if a request of any type (get, post etc.) is made to invalid route path
app.all('*', async (req, res, next) => {
    // when callback function is async it will throw unusual error like 502 bad gateway
    // throw new NotFoundError()

    // to handle this we can use next function by express
    // next(new NotFoundError());

    // another way we can handle this using the express-async-errors package by just importing it
    throw new NotFoundError();
})

app.use(errorHandler);

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    } catch(e) {
        console.log(e)
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!');
    });
}

start();