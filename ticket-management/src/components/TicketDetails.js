import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router';
import {Link} from 'react-router-dom';
import {getTicketDetailsFromExternalApi} from '../services/ticketService';

const TicketDetails = () =>{
    const [ticket, setTicket] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();
    console.log(id);

    useEffect(()=>{
        getTicketDetails(id);
    },[])

    const getTicketDetails = async () =>{
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

    const redirectToTicketLists = () => {

    }
    const {subject, description, tags, type} = ticket;
    return(
        <>
        {!isLoading && (
            <>
            <div>
                <p>
                    Subject: {subject}
                </p>
                <p>
                    Description: {description}
                </p>
                
            </div>
            <button>
                <Link to={`/tickets`}>Back to List</Link>
            </button> 
            </>

        )}
        </>
    );
}

export default TicketDetails;