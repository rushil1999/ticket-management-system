import React, {useState, useEffect} from 'react';
import {getTicketListFromExternalApi } from '../services/ticketService';
import {Link} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Tags from './Tags';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';  
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



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
        <React.Fragment>
        {/* {!isLoading && (
            <>
            <ul>
                {ticketList.map((row)=>{
                    return(
                        <li key={row.id}>
                            <Link to={`/ticket/${row.id}`}>{row.subject}</Link>
                            
                        </li>
                    )
                })}
            </ul>
            <button onClick={()=>{getTicketList('after')}} disabled={!ticketMetaData.meta.has_more}>Next</button>
            <br/>
            <button onClick={()=>{getTicketList('previous')}} disabled={!(counter>0)}>Last</button>
            </>
        )} */}
        <div style={{textAlign:'center'}}>
            <h1>Tickets</h1>
        </div>
        {!isLoading ? (
            <>
            <Card variant="outlined">
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h5" gutterBottom component="div">
                                Ticket ID
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="h5" gutterBottom component="div">
                                Subject
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="h5" gutterBottom component="div">
                                Tags
                            </Typography>
                        </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {ticketList.map((ticket) => (
                        <TableRow
                        key={ticket.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {ticket.id}
                        </TableCell>
                        <TableCell align="right">
                            <Link 
                                type={'button'}
                                style={{color:'blue', textDecoration:'none'}}
                                to={`/ticket/${ticket.id}`}>
                                {ticket.subject}
                            </Link>
                        </TableCell>
                        <TableCell size="small" align="right">
                            <Tags
                                tags={ticket.tags}
                            />
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                
            </TableContainer>
            </Card>
            <footer >
            <Stack style={{padding: '20px'}}direction="row" spacing={145}>
                <Button
                    variant="contained"
                    onClick={()=>{getTicketList('previous')}} disabled={!(counter>0)}
                >
                    Last
                </Button>
                <Button 
                    variant="contained"
                    onClick={()=>{getTicketList('after')}} disabled={!ticketMetaData.meta.has_more}
                >
                    Next
                </Button>
                
            </Stack>
            </footer>
          </>
        ): (
            <Box style={{ display: 'flex' , justifyContent:'center', position: 'relative'}}>
                <CircularProgress />
            </Box>
        )}
        
        </React.Fragment>
        
    );
}

export default TicketList;