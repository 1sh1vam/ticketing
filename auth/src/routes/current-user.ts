import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', async (req, res) => {
    // If token is not present directly send currentUser as null
    if (!req.session?.jwt) {
        return res.send({ currentUser: null });
    };

    // Now verifying the token
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
        res.send({ currentUser: payload });
    } catch (e) {
        res.send({ currentUser: null });
    }
});

export { router as currentUserRouter }