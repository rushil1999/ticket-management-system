import express from 'express';
import { getTickets, getTicketDetails, getTicketCount } from '../controller/ticketController';
const router = express.Router();
router.get('/tickets', getTickets);
router.get('/count', getTicketCount);
router.get('/:id', getTicketDetails);

export default router;