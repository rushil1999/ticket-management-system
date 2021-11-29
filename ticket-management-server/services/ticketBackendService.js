export const parseTicketsListData = (ticketList) => {
    const parsedTicketsList = ticketList.map((ticket)=>{
        const {id, subject, tags} = ticket;
        const reducedTicket = {
            id,
            subject, 
            tags, 
        }
        return reducedTicket;
    })
    return parsedTicketsList ;
}

export const getTicketsAsPerPage = (tickets, pageCount) => {
    const start = 25*(pageCount-1) ;
    const end = start + 25 ;
    return tickets.slice(start, end); //0 indexing
}