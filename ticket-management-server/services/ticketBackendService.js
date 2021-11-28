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