import { BACKEND_API_TICKETS_URL, BACKEND_API_TICKET_URL } from "./constants";

export const getTicketListFromExternalApi = async (page) =>{

    const options = {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json', 
        },
    }

    const response = await fetch(`${BACKEND_API_TICKETS_URL}?page=${page}`, options);
    const status = response.status;
    const data = await response.json();
    return{ data, status};
}

export const getTicketDetailsFromExternalApi = async id =>{

    const options = {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json', 
        },
    }

    const response = await fetch(`${BACKEND_API_TICKET_URL}/${id}`, options);
    const status = response.status;
    const data = await response.json();
    return{ data, status};
}


export const getTicketCountFromExternalApi = async () =>{

    const options = {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json', 
        },
    }

    const response = await fetch(`${BACKEND_API_TICKET_URL}/count`, options);
    const status = response.status;
    const data = await response.json();
    return{ data, status};
}