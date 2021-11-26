import express from 'express';
import { getTickets, getTicketDetails } from '../controller/ticketController';
const router = express.Router();
router.get('/tickets', getTickets);
router.get('/ticket/:id', getTicketDetails);

export default router;