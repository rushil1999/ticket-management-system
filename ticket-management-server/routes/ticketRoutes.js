import express from 'express';
import { getTickets } from '../controller/ticketController';
const router = express.Router();
router.get('/tickets', getTickets);

export default router;