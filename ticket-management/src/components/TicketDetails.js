import { Divider, Button } from '@mui/material';
import React, {useState, useEffect} from 'react'
import {Link, useParams, useLocation} from 'react-router-dom';
import {getTicketDetailsFromExternalApi} from '../services/ticketService';
import Tags from './Tags';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

const TicketDetails = props =>{
    const location = useLocation();
    const [ticket, setTicket] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const {id} = useParams();
    const [msg, setMsg] = useState('');
    const page = location.state?.page;

    useEffect(()=>{
        getTicketDetails(id);
    },[])

    const getTicketDetails = async () =>{
        setIsLoading(true);
        const {data, status} = await getTicketDetailsFromExternalApi(id);
        if(status === 200){
            const {ticket} = data.payload;
            setTicket(ticket);
            setIsLoading(false);

        }
        else{
            console.log('Error Occured');
            setMsg(data.errorMessage);
            setOpen(true);

        }
    }

    const {subject, description, tags, type} = ticket;
    return(
        <>
        <div style={{textAlign:'center'}}>
                <h1>Ticket Details</h1>
        </div>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={()=>{setOpen(false)}}
            message={msg}

        />
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
                
                <Typography style={{paddingTop:'15px', color: 'blueviolet'}} variant="h5" gutterBottom component="div">
                    Subject
                </Typography>
                                
                <Typography variant="h7" gutterBottom component="div">
                    {subject}
                </Typography>
                <Divider/>
                <Typography style={{paddingTop:'15px', color: 'blueviolet'}} variant="h5" gutterBottom component="div">
                    Description
                </Typography>
                <Typography variant="h7" gutterBottom component="div">
                    {description}
                </Typography>
                <Divider/>
                <Typography style={{paddingTop:'15px', color: 'blueviolet'}} variant="h5" gutterBottom component="div">
                    Tags
                </Typography>
                <Typography variant="h7" gutterBottom component="div">
                    <Tags viewType={'details'} tags={tags}/>
                </Typography>
                
            </div>
            <div style={{textAlign:'center'}}>
                <Button variant="outlined">
                    <Link style={{color: 'black', textDecoration: 'none'}} 
                    to={`/tickets`}
                    state={{page}}
                    >Back to List</Link>
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