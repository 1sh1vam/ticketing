import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@simtix/ticketing-common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { Order } from '../models/order';
import { Ticket } from '../models/ticket';
import { natsWrapper } from '../nats-wrapper';
const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

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
    const { ticketId } = req.body;
    // 1. Find the ticket that user is trying to order in database
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFoundError();
    }

    // 2. Make sure the ticket is not already reserved
    const isReserved = await ticket.isReserved();
    if (isReserved) throw new BadRequestError('Ticket is already reserved');

    // 3. Calculate an expiration date for this order.
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // 4. Create the order and save it to the database
    const order = Order.build({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket,
    });

    await order.save();

    // 5. Publish an event saying that an order was creared
    await new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      status: order.status,
      expiresAt: order.expiresAt.toISOString(),
      userId: order.userId,
      ticket: {
        id: ticket.id,
        price: ticket.price,
      }
    });

    res.status(201).send(order);
  }
);

export { router as newOrderRouter }