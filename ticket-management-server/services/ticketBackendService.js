export const parseTicketsListData = (ticketList) => {
    const parsedTicketsList = ticketList.map((ticket)=>{
        const {id, subject, description, tags} = ticket;
        const reducedTicket = {
            id,
            subject, 
            description,
            tags, 
        }
        return reducedTicket;
    })
    // console.log(parsedTicketsList);
    return parsedTicketsList ;
}