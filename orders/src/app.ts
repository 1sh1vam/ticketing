import express from 'express';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@simtix/ticketing-common';

const app = express();
app.set('trust proxy', true);

app.use(express.json());

app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
}));

app.use('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };