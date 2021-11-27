import React, {useState, useEffect} from 'react';
import {getTicketListFromExternalApi } from '../services/ticketService';

const TicketList = () =>{
    const [ticketList, setTicketList] = useState([]);
    const [ticketMetaData, setTicketMetaData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(()=>{
        getTicketList('initial');
    }, []);

    const getTicketList = async type =>{
        setIsLoading(true);
        let cursor;
        switch(type){
            case 'after':{
                cursor = ticketMetaData.meta.after_cursor;
                setCounter(counter+1);
                break;
            }
            case 'previous': {
                cursor = ticketMetaData.meta.before_cursor;
                setCounter(counter-1);
                break;
            }
            case 'initial':{
                cursor = 'initial';
                setCounter(0);
                break;
            }
        }
        const {data, status } = await getTicketListFromExternalApi(type, cursor);
        if(status === 200){
            const {tickets, meta, links} = data.payload;
            setTicketList(tickets);
            setTicketMetaData({meta, links});
            // console.log(tickets.length);
        }
        else{
            console.log('Error Occured');
        }
        setIsLoading(false);
    }

    return(
        <>
        {!isLoading && (
            <>
            <ul>
                {ticketList.map((row)=>{
                    return(
                        <li key={row.id}>
                            {row.subject}
                        </li>
                    )
                })}
            </ul>
            <button onClick={()=>{getTicketList('after')}} disabled={!ticketMetaData.meta.has_more}>Next</button>
            <br/>
            <button onClick={()=>{getTicketList('previous')}} disabled={!(counter>0)}>Last</button>
            </>
        )}
        
        </>
        
    );
}

export default TicketList;