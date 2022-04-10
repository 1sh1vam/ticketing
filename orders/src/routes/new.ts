import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@simtix/ticketing-common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Order } from '../models/order';
import { Ticket } from '../models/ticket';
const router = express.Router();

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided.'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // 1. Find the ticket that user is trying to order in database
    const ticket = await Ticket.findById(req.body.ticketId);

    if (!ticket) throw new NotFoundError();

    // 2. Make sure the ticket is not already reserved
    const isReserved = await ticket.isReserved();
    if (isReserved) throw new BadRequestError('Ticket is already reserved');
  }
);

export { router as newOrderRouter }