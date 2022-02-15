import express from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.get('/api/users/currentuser',[
    body('email')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password length must be between 4 and 20 charecters')
], (req, res) => {
    const { email, password } = req.body();
    res.send("Hi!, there.")
});

export { router as currentUserRouter }