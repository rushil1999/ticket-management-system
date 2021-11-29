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
import Stack from '@mui/material/Stack';


const TicketDetails = () =>{
    const location = useLocation();
    const [ticket, setTicket] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const page = location.state?.page;
    const {id} = useParams();

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
    const {subject, description, tags, type, status} = ticket;
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
                {type && (
                <>
                <Stack direction="row" spacing={1}>
                <Typography style={{color: 'blueviolet'}} variant="h5" gutterBottom component="div">
                    Type
                </Typography>
                <Typography variant="h7" gutterBottom component="div">
                     <Chip label={type}  size="medium"/>
                     {/* {type} */}
                </Typography>
                </Stack>
                <Divider/>
                </>
                )}
                {status && (
                    <>
                    <div style={{paddingTop:'15px'}}>
                    <Stack direction="row" spacing={1}>
                    
                    <Typography style={{color: 'blueviolet'}} variant="h5" gutterBottom component="div">
                        Status
                    </Typography>
                    <Typography variant="h7" gutterBottom component="div">
                        <Chip label={status}  size="medium"/>
                        {/* {status} */}
                    </Typography>
                    </Stack>
                    </div>
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
                    to={`/`}
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