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
    CircularProgress,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Tooltip,
    Alert,
    Snackbar,
    Fade
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const TradeList = () => {
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedTrade, setSelectedTrade] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [deleteLoading, setDeleteLoading] = useState(false);

    const fetchTrades = () => {
        setLoading(true);
        axios.get('/api/trades')
            .then(response => {
                setTrades(response.data);
            })
            .catch(error => {
                console.error('Error fetching trades:', error);
                setSnackbar({
                    open: true,
                    message: 'Failed to fetch trades. Please try again.',
                    severity: 'error'
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTrades();
    }, []);

    const handleDeleteClick = (trade) => {
        setSelectedTrade(trade);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (!selectedTrade) return;
        
        setDeleteLoading(true);
        axios.delete(`/api/trades/${selectedTrade.id}`)
            .then(() => {
                setTrades(trades.filter(t => t.id !== selectedTrade.id));
                setSnackbar({
                    open: true,
                    message: 'Trade deleted successfully',
                    severity: 'success'
                });
            })
            .catch(error => {
                console.error('Error deleting trade:', error);
                setSnackbar({
                    open: true,
                    message: 'Failed to delete trade. Please try again.',
                    severity: 'error'
                });
            })
            .finally(() => {
                setDeleteLoading(false);
                setDeleteDialogOpen(false);
                setSelectedTrade(null);
            });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

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
                            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trades.map(trade => (
                            <TableRow 
                                key={trade.id}
                                sx={{ 
                                    '&:nth-of-type(odd)': { backgroundColor: 'background.paper' },
                                    '&:hover': { backgroundColor: 'action.hover' }
                                }}
                            >
                                <TableCell>{trade.id}</TableCell>
                                <TableCell>{trade.tradeId}</TableCell>
                                <TableCell>{trade.instrument}</TableCell>
                                <TableCell>${trade.price.toFixed(2)}</TableCell>
                                <TableCell>{trade.quantity}</TableCell>
                                <TableCell>{trade.sourceSystem}</TableCell>
                                <TableCell>{new Date(trade.tradeDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Tooltip title="Delete Trade" placement="left">
                                        <IconButton
                                            onClick={() => handleDeleteClick(trade)}
                                            size="small"
                                            sx={{
                                                color: 'error.light',
                                                '&:hover': {
                                                    color: 'error.main',
                                                    backgroundColor: 'error.lighter',
                                                },
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={deleteDialogOpen}
                onClose={() => !deleteLoading && setDeleteDialogOpen(false)}
                PaperProps={{
                    elevation: 3,
                    sx: { borderRadius: 2 }
                }}
            >
                <DialogTitle>
                    <Typography variant="h6" component="div">
                        Confirm Delete
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete trade {selectedTrade?.tradeId}?
                        This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 0 }}>
                    <Button
                        onClick={() => setDeleteDialogOpen(false)}
                        disabled={deleteLoading}
                        sx={{ mr: 1 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        variant="contained"
                        color="error"
                        disabled={deleteLoading}
                        sx={{
                            minWidth: 100,
                            position: 'relative'
                        }}
                    >
                        {deleteLoading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                TransitionComponent={Fade}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity}
                    variant="filled"
                    elevation={6}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default TradeList;
