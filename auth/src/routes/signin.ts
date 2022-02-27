import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { Password } from '../services/password';

const router = express.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Provide a valid email id'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Provide a valid password')
    ], validateRequest,
     async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            throw new BadRequestError('Invalid credentials')
        }

        const passwordMatches = await Password.compare(existingUser.password, password);

        if (!passwordMatches) {
            throw new BadRequestError('Invalid credentials')
        }

        // Creating user jwt token
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!);

        // Setting the json token in cookie
        req.session = {
            jwt: userJwt
        };


        res.send(existingUser);
});

export { router as signinRouter }