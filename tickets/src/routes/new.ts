import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/tickets', async (req, res) => {
    return res.sendStatus(401);
});


export { router as createTicketRouter }