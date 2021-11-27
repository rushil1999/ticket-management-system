import axios from 'axios';
import { TICKET_DEFAULT_COUNT } from '../constants';
import { parseTicketsListData } from '../services/ticketBackendService';
export const getTickets = async (req, res) => {
    const page = req.query.page;
    let cursor = req.query.cursor;
    console.log(req.query)  
    let url;
    if(cursor === 'initial'){
        url = `https://zccrushil.zendesk.com/api/v2/tickets.json?page[size]=${TICKET_DEFAULT_COUNT}`; 
    }
    else{
        url = `https://zccrushil.zendesk.com/api/v2/tickets.json?page[size]=${TICKET_DEFAULT_COUNT}&page[${page}]=${cursor}`;

    }
    console.log(cursor, url);
    const options = {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Basic ${process.env.AUTHORIZATION_HASH}`, 
            'Cookie': '__cfruid=5f4b1ddccace38e995b5c103800b4b4d32ec0ee8-1637788845; __cfruid=c189baeab5ba41f3a877ff36814134ada39601b4-1637801371'
        },
    }
    try{
        
        const response = await axios(url,  options);
        const status = response.status;

        const{ tickets, meta, links} = response.data
        const reducedTickets = parseTicketsListData(tickets);
        console.log('Meta DATA', meta, links);
        res.status(200).json({
            payload: {
                tickets: reducedTickets,
                meta, 
                links

            }
        });
    }catch(err){
        console.log(err);
    }
}

export const getTicketDetails = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const url = `https://zccrushil.zendesk.com/api/v2/tickets/${id}`;
    const options = {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Basic ${process.env.AUTHORIZATION_HASH}`, 
            'Cookie': '__cfruid=5f4b1ddccace38e995b5c103800b4b4d32ec0ee8-1637788845; __cfruid=c189baeab5ba41f3a877ff36814134ada39601b4-1637801371'
        },
    }
    try{
        const response = await axios(url,  options);
        const status = response.status;
        const{ ticket} = response.data
        res.status(status).json({
            payload: {
                ticket
            }
        });
    }catch(err){
        console.log(err);
    }
}