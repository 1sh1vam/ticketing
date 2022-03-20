import express from 'express';
import { currentUser, requireAuth } from '@simtix/ticketing-common';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  requireAuth,
  async (req, res) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter }