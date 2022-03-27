import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@simtix/ticketing-common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { listTicketsRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);

app.use(express.json());

app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
}));

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(listTicketsRouter);
app.use(updateTicketRouter);

app.all('*',async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
