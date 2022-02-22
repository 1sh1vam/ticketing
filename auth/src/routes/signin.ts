import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';

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
    (req: Request, res: Response) => {

});

export { router as signinRouter }