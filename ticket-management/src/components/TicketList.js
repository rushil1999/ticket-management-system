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
import Tags from './Tags';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

const TicketList = () =>{
    const [ticketList, setTicketList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(()=>{
        getTicketList(1);
    }, []);

    const getTicketList = async page =>{
        setIsLoading(true);
        const {data, status } = await getTicketListFromExternalApi(page);
        if(status === 200){
            const {tickets, count} = data.payload;
            setTicketList(tickets);
            setTotalCount(count);
        }
        else{
            console.log('Error Occured');
        }
        setIsLoading(false);
    }

    const handlePageChange = (e, newPage) => {
        setPage(newPage);
        getTicketList(newPage);

    }
    return(
        <React.Fragment>
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