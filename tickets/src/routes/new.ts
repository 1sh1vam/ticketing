import { requireAuth } from '@simtix/ticketing-common';
import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/tickets', requireAuth, async (req, res) => {
    return res.sendStatus(405);
});


export { router as createTicketRouter }