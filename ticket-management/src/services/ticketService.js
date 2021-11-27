export const getTicketListFromExternalApi = async (type, cursor) =>{

    const options = {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json', 
        },
    }

    const response = await fetch(`http://localhost:5000/ticket/tickets?page=${type}&cursor=${cursor}`, options);
    const status = response.status;
    const data = await response.json();
    // console.log(data);
    return{ data, status};
}

export const getTicketDetailsFromExternalApi = async id =>{

    const options = {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json', 
        },
    }

    const response = await fetch(`http://localhost:5000/ticket/${id}`, options);
    const status = response.status;
    const data = await response.json();
    // console.log(data);
    return{ data, status};
}