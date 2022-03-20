import express from 'express';
import 'express-async-errors';
import { NotFoundError, errorHandler } from '@simtix/ticketing-common';
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import cookieSession from 'cookie-session';


const app = express();
app.set('trust proxy', true);

app.use(express.json());

// Checking the node environment before setting up the secure call.
// As while testing we are not making an https call so we will set secure to false
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test', // This option is to tell that set cookie only if connection is a secure connection.
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

export { app };