import { requireAuth, validateRequest } from '@simtix/ticketing-common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.post('/api/tickets', requireAuth, [
    body('title')
        .notEmpty()
        .withMessage('Title is required')], validateRequest, async (req: Request, res: Response) => {
    return res.sendStatus(405);
});


export { router as createTicketRouter }