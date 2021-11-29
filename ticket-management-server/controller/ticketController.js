import axios from 'axios';
import { 
    ZENDESK_TICKET_LIST_URL, 
    ZENDESK_SERVER_COOKIE, 
    ZENDESK_TICKET_URL,
    INTERNAL_SERVER_ERROR_MSG
} from '../constants';
import { parseTicketsListData , getTicketsAsPerPage} from '../services/ticketBackendService';
import { sendCustomeError, sendCustomeSuccess } from './common';

export const getTickets = async (req, res) => {
    let url;
    const page = req.query.page;
    const options = {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Basic ${process.env.AUTHORIZATION_HASH}`, 
            'Cookie':`${ZENDESK_SERVER_COOKIE}`
        },
    }
    const val = page%4 !== 0 ? Math.floor(page/4) : Math.floor(page/4)-1;
    console.log('Val ', val, page, page%4);    
    url = `${ZENDESK_TICKET_LIST_URL}?page=${val+1}`;
    try{
        const response = await axios(url, options);
        const tickets = response.data.tickets;
        const count = response.data.count;
        const ticketListLength = tickets.length;
        const adjustedPageCount = page%4 === 0 ? 4 : page%4;
        const requiredTickets = ticketListLength > 25 
            ? getTicketsAsPerPage(tickets, adjustedPageCount)
            : tickets;
        const reducedTickets = parseTicketsListData(requiredTickets);
        res.status(200).json({
            payload: {
                tickets: reducedTickets,
                count,
            }
        })
    }
    catch(err){
        console.log(err);
        sendCustomeError(res, INTERNAL_SERVER_ERROR_MSG, 500);  
    }
}

export const getTicketDetails = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const url = `${ZENDESK_TICKET_URL}/${id}`;
    const options = {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Basic ${process.env.AUTHORIZATION_HASH}`, 
            'Cookie': `${ZENDESK_SERVER_COOKIE}`
        },
    }
    try{
        const response = await axios(url,  options);
        const status = response.status;
        const{ ticket} = response.data;
        sendCustomeSuccess(res, {ticket}, status);
    }catch(err){
        console.log(err);
        sendCustomeError(res, INTERNAL_SERVER_ERROR_MSG, 500);
    }
}