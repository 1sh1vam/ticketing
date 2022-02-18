import express from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";


const app = express();

app.use(express.json());
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

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});