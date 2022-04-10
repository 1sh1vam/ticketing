import express from 'express';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@simtix/ticketing-common';
import { newOrderRouter } from './routes/new';

const app = express();
app.set('trust proxy', true);

app.use(express.json());

app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
}));

app.use(currentUser);

app.use(newOrderRouter);

app.use('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };