import { Divider, Button } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router';
import {Link} from 'react-router-dom';
import {getTicketDetailsFromExternalApi} from '../services/ticketService';
import Tags from './Tags';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


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
        <div style={{textAlign:'center'}}>
                <h1>Ticket Details</h1>
        </div>
        {!isLoading ? (
            <>
            
            <Divider/>
            <div style={{padding:'15px'}}>
                {type && (<><Typography variant="h5" gutterBottom component="div">
                    <Chip label={type} color="info" size="medium"/>
                </Typography>
                <Divider/>
                </>
                )}
                
                <Typography style={{paddingTop:'15px'}} variant="h5" gutterBottom component="div">
                    Subject
                </Typography>
                                
                <Typography variant="h7" gutterBottom component="div">
                    {subject}
                </Typography>
                <Divider/>
                <Typography style={{paddingTop:'15px'}} variant="h5" gutterBottom component="div">
                    Description
                </Typography>
                <Typography variant="h7" gutterBottom component="div">
                    {description}
                </Typography>
                <Divider/>
                <Typography style={{paddingTop:'15px'}} variant="h5" gutterBottom component="div">
                    Tags
                </Typography>
                <Typography variant="h7" gutterBottom component="div">
                    <Tags tags={tags}/>
                </Typography>
                
            </div>
            <div style={{textAlign:'center'}}>
                <Button variant="outlined">
                    <Link style={{color: 'black', textDecoration: 'none'}} to={`/tickets`}>Back to List</Link>
                </Button> 
            </div>
            
            </>

        ): (
            <Box style={{ display: 'flex' , justifyContent:'center', position: 'relative'}}>
                <CircularProgress />
            </Box>
        )}
        </>
    );
}

export default TicketDetails;