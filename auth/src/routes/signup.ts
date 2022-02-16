import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password length must be between 4 and 20 charecters')
], (req: Request, res: Response) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).send(errors.array());
    }
    console.log('user is getting created');

    res.send({});
});

export { router as signupRouter }