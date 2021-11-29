import React, {useState, useEffect} from 'react';
import {getTicketCountFromExternalApi, getTicketListFromExternalApi } from '../services/ticketService';
import {Link} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tags from './Tags';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { Button } from '@mui/material';
import renderer from 'react-test-renderer';
import Snackbar from '@mui/material/Snackbar';
import {useLocation} from 'react-router-dom';


const TicketList = () =>{
    const location = useLocation();
    const [ticketList, setTicketList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(location.state?.page | 1);
    const [totalCount, setTotalCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(()=>{
        getTicketCount();
        getTicketList(page);
    }, []);

    const getTicketCount = async () =>{ 
        setIsLoading(true);
        const {data, status} = await getTicketCountFromExternalApi();
        if(status === 200){
            const {count} = data.payload;
            setTotalCount(count);
        }
        else{
            console.log('error Occured');
        }
        setIsLoading(false);
    }

    const getTicketList = async page =>{
        setIsLoading(true);
        const {data, status } = await getTicketListFromExternalApi(page);
        if(status === 200){
            const {tickets, count} = data.payload;
            setTicketList(tickets);
        }
        else{
            console.log('Error Occured');
            setMsg(data.errorMessage);
            setOpen(true);
        }
        setIsLoading(false);
    }

    const handlePageChange = (e, newPage) => {
        setPage(newPage);
        getTicketList(newPage);

    };

    return(
        <React.Fragment>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={()=>{setOpen(false)}}
            message="An Error Occured"

        />
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
                                to={`/ticket/${ticket.id}`} 
                                state={{page}}
                            >
                                {ticket.subject}
                            </Link>
                            {/* <Button 
                                onClick={() => redirectToTicketDetailsPage(ticket.id)}
                            >
                                {ticket.subject}
                            </Button> */}
                        </TableCell>
                        <TableCell size="small" align="right">
                            <Tags
                                viewType={'list'}
                                tags={ticket.tags}
                            />
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                
            </TableContainer>
            <div style={{ display: 'flex' , justifyContent:'center', position: 'relative'}}>
                <Pagination 
                    count={Math.ceil(totalCount/25)}
                    page={page}
                    onChange={handlePageChange} 
                    color="primary" 
                />
            </div>
            
            </Card>
            
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