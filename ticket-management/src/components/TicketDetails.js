import React, {useState, useEffect} from 'react'

const TicketDetails = props =>{
    const [ticket, setTicket] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        getTicketDetails();
    },[])

    const getTicketDetails = () =>{
        const{ id } = props; 
        setIsLoading(true);
        const {data, status} = await getTicketDetailsFromExternalApi(id);
        if(status === 200){
            const {ticket} = data.payload;
            setTicket(ticket);
            console.log(ticket);
        }
        else{
            console.log('Error Occured');
        }
        setIsLoading(false);
    }

    const {subject, description, tags, type} = ticket;
    return(
        <>
        {!isLoading && (
            <div>
                <p>
                    Subject: {subject}
                </p>
                <p>
                    Description: {description}
                </p>
                
            </div> 
        )}
        </>
    );
}

export default TicketDetails;