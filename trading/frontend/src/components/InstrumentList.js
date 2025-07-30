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

const InstrumentList = () => {
    const [instruments, setInstruments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/instruments')
            .then(response => {
                setInstruments(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching instruments:', error);
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
                Instruments
            </Typography>
            <TableContainer component={Paper} elevation={2}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.main' }}>
                            <TableCell sx={{ color: 'white' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white' }}>Symbol</TableCell>
                            <TableCell sx={{ color: 'white' }}>Name</TableCell>
                            <TableCell sx={{ color: 'white' }}>ISIN</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {instruments.map(instrument => (
                            <TableRow 
                                key={instrument.id}
                                sx={{ '&:nth-of-type(odd)': { backgroundColor: 'background.paper' } }}
                            >
                                <TableCell>{instrument.id}</TableCell>
                                <TableCell>{instrument.symbol}</TableCell>
                                <TableCell>{instrument.name}</TableCell>
                                <TableCell>{instrument.isin}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default InstrumentList;
