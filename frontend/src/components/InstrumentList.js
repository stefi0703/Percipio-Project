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
    Button,
    Snackbar,
    Alert,
    Fade,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateInstrumentDialog from './CreateInstrumentDialog';

const InstrumentList = () => {
    const [instruments, setInstruments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [createError, setCreateError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedInstrument, setSelectedInstrument] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const fetchInstruments = () => {
        setLoading(true);
        axios.get('/api/instruments')
            .then(response => {
                setInstruments(response.data);
            })
            .catch(error => {
                console.error('Error fetching instruments:', error);
                setSnackbar({
                    open: true,
                    message: 'Failed to fetch instruments. Please try again.',
                    severity: 'error'
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchInstruments();
    }, []);

    const handleCreateInstrument = (instrumentData) => {
        setCreateLoading(true);
        setCreateError(null);
        
        axios.post('/api/instruments', instrumentData)
            .then(response => {
                setInstruments([response.data, ...instruments]);
                setCreateDialogOpen(false);
                setSnackbar({
                    open: true,
                    message: 'Instrument created successfully',
                    severity: 'success'
                });
            })
            .catch(error => {
                console.error('Error creating instrument:', error);
                setCreateError('Failed to create instrument. Please try again.');
            })
            .finally(() => {
                setCreateLoading(false);
            });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleDeleteClick = (instrument) => {
        setSelectedInstrument(instrument);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (!selectedInstrument) return;
        
        setDeleteLoading(true);
        axios.delete(`/api/instruments/${selectedInstrument.id}`)
            .then(() => {
                setInstruments(instruments.filter(i => i.id !== selectedInstrument.id));
                setSnackbar({
                    open: true,
                    message: 'Instrument deleted successfully',
                    severity: 'success'
                });
            })
            .catch(error => {
                console.error('Error deleting instrument:', error);
                setSnackbar({
                    open: true,
                    message: 'Failed to delete instrument. Please try again.',
                    severity: 'error'
                });
            })
            .finally(() => {
                setDeleteLoading(false);
                setDeleteDialogOpen(false);
                setSelectedInstrument(null);
            });
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h1">
                    Instruments
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setCreateDialogOpen(true)}
                    sx={{
                        bgcolor: '#00137F',
                        '&:hover': {
                            bgcolor: '#001AA9'
                        }
                    }}
                >
                    New Instrument
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={2}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.main' }}>
                            <TableCell sx={{ color: 'white' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white' }}>Symbol</TableCell>
                            <TableCell sx={{ color: 'white' }}>Name</TableCell>
                            <TableCell sx={{ color: 'white' }}>ISIN</TableCell>
                            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {instruments.map(instrument => (
                            <TableRow 
                                key={instrument.id}
                                sx={{ 
                                    '&:nth-of-type(odd)': { backgroundColor: 'background.paper' },
                                    '&:hover': { backgroundColor: 'action.hover' }
                                }}
                            >
                                <TableCell>{instrument.id}</TableCell>
                                <TableCell>{instrument.symbol}</TableCell>
                                <TableCell>{instrument.name}</TableCell>
                                <TableCell>{instrument.isin}</TableCell>
                                <TableCell>
                                    <Tooltip title="Delete Instrument" placement="left">
                                        <IconButton
                                            onClick={() => handleDeleteClick(instrument)}
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

            <CreateInstrumentDialog
                open={createDialogOpen}
                onClose={() => {
                    setCreateDialogOpen(false);
                    setCreateError(null);
                }}
                onSubmit={handleCreateInstrument}
                loading={createLoading}
                error={createError}
            />

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
                        Are you sure you want to delete instrument {selectedInstrument?.symbol} ({selectedInstrument?.name})?
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
        </div>
    );
};

export default InstrumentList;
