import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password length must be between 4 and 20 charecters')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = User.build({ email, password });
        await user.save();

        // Generating a jwt token

        const userJwt = jwt.sign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_KEY!); // asdf is a secret key which is used to generate the json token. This need to
        // stored very securely. However for dev purposes I have used this simple string here.
        // The exclamation mark after the process.env.JWT_KEY is to tell typescript that we are
        // sure this key exists typescript doesn't need to worry about that.

        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user);
});

export { router as signupRouter }