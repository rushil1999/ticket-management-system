import axios from 'axios';
import { TICKET_DEFAULT_COUNT, 
    ZENDESK_TICKET_LIST_URL, 
    ZENDESK_SERVER_COOKIE, 
    ZENDESK_TICKET_URL,
    INITIAL_PAGE_CONSTANT
} from '../constants';
import { parseTicketsListData } from '../services/ticketBackendService';
import { sendCustomeError, sendCustomeSuccess } from './common';

export const getTickets = async (req, res) => {
    const page = req.query.page;
    let cursor = req.query.cursor;
    console.log(req.query)  
    let url;
    if(cursor === INITIAL_PAGE_CONSTANT){
        url = `${ZENDESK_TICKET_LIST_URL}?page[size]=${TICKET_DEFAULT_COUNT}`; 
    }
    else{
        url = `${ZENDESK_TICKET_LIST_URL}?page[size]=${TICKET_DEFAULT_COUNT}&page[${page}]=${cursor}`;

    }
    console.log(cursor, url);
    const options = {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Basic ${process.env.AUTHORIZATION_HASH}`, 
            'Cookie':`${ZENDESK_SERVER_COOKIE}`
        },
    }
    try{
        
        const response = await axios(url,  options);
        const status = response.status;

        const{ tickets, meta, links} = response.data
        const reducedTickets = parseTicketsListData(tickets);
        return sendCustomeSuccess(res, {
            tickets: reducedTickets,
            meta, 
            links
        }, 200);
    }catch(err){
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