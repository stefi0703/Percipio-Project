import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    CircularProgress
} from '@mui/material';

const TradeList = () => {
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/trades')
            .then(response => {
                setTrades(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching trades:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div>
            <Typography variant="h1" gutterBottom>
                Trades
            </Typography>
            <TableContainer component={Paper} elevation={2}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.main' }}>
                            <TableCell sx={{ color: 'white' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white' }}>Trade ID</TableCell>
                            <TableCell sx={{ color: 'white' }}>Instrument</TableCell>
                            <TableCell sx={{ color: 'white' }}>Price</TableCell>
                            <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                            <TableCell sx={{ color: 'white' }}>Source System</TableCell>
                            <TableCell sx={{ color: 'white' }}>Trade Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trades.map(trade => (
                            <TableRow 
                                key={trade.id}
                                sx={{ '&:nth-of-type(odd)': { backgroundColor: 'background.paper' } }}
                            >
                                <TableCell>{trade.id}</TableCell>
                                <TableCell>{trade.tradeId}</TableCell>
                                <TableCell>{trade.instrument}</TableCell>
                                <TableCell>${trade.price.toFixed(2)}</TableCell>
                                <TableCell>{trade.quantity}</TableCell>
                                <TableCell>{trade.sourceSystem}</TableCell>
                                <TableCell>{new Date(trade.tradeDate).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TradeList;
