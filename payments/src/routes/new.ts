import express, { Request, Response } from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/api/payments',
  [body('orderId').not().isEmpty(), body('token').not().isEmpty()],
  async (req: Request, res: Response) => {
    res.send({ success: true });
  }
);

export { router as createChargeRouter }