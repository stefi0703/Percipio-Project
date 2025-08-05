import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    IconButton,
    CircularProgress,
    Alert,
    Grid
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';

const CreateTradeDialog = ({ open, onClose, onSubmit, loading, error }) => {
    const [trade, setTrade] = useState({
        tradeId: '',
        instrument: '',
        price: '',
        quantity: '',
        sourceSystem: '',
        tradeDate: new Date()
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!trade.tradeId) newErrors.tradeId = 'Trade ID is required';
        if (!trade.instrument) newErrors.instrument = 'Instrument is required';
        if (!trade.price || isNaN(trade.price) || parseFloat(trade.price) <= 0) {
            newErrors.price = 'Valid price is required';
        }
        if (!trade.quantity || isNaN(trade.quantity) || parseInt(trade.quantity) <= 0) {
            newErrors.quantity = 'Valid quantity is required';
        }
        if (!trade.sourceSystem) newErrors.sourceSystem = 'Source system is required';
        if (!trade.tradeDate) newErrors.tradeDate = 'Trade date is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const formattedTrade = {
            ...trade,
            tradeDate: format(trade.tradeDate, 'yyyy-MM-dd'),
            price: parseFloat(trade.price),
            quantity: parseInt(trade.quantity)
        };

        onSubmit(formattedTrade);
    };

    const handleClose = () => {
        setTrade({
            tradeId: '',
            instrument: '',
            price: '',
            quantity: '',
            sourceSystem: '',
            tradeDate: new Date()
        });
        setErrors({});
        onClose();
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                elevation: 3,
                sx: { 
                    borderRadius: 2,
                    backgroundColor: '#FFFFFF'
                }
            }}
        >
            <DialogTitle sx={{ 
                m: 0, 
                p: 2,
                pb: 3,
                backgroundColor: '#00137F',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Typography variant="h6">Create New Trade</Typography>
                <IconButton
                    onClick={handleClose}
                    sx={{ color: 'white' }}
                    disabled={loading}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 3, pt: 4 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Trade ID"
                            fullWidth
                            value={trade.tradeId}
                            onChange={(e) => setTrade({ ...trade, tradeId: e.target.value })}
                            error={!!errors.tradeId}
                            helperText={errors.tradeId}
                            disabled={loading}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Instrument"
                            fullWidth
                            value={trade.instrument}
                            onChange={(e) => setTrade({ ...trade, instrument: e.target.value })}
                            error={!!errors.instrument}
                            helperText={errors.instrument}
                            disabled={loading}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Price"
                            fullWidth
                            type="number"
                            value={trade.price}
                            onChange={(e) => setTrade({ ...trade, price: e.target.value })}
                            error={!!errors.price}
                            helperText={errors.price}
                            disabled={loading}
                            InputProps={{
                                startAdornment: <Box component="span" sx={{ mr: 1 }}>$</Box>
                            }}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Quantity"
                            fullWidth
                            type="number"
                            value={trade.quantity}
                            onChange={(e) => setTrade({ ...trade, quantity: e.target.value })}
                            error={!!errors.quantity}
                            helperText={errors.quantity}
                            disabled={loading}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Source System"
                            fullWidth
                            value={trade.sourceSystem}
                            onChange={(e) => setTrade({ ...trade, sourceSystem: e.target.value })}
                            error={!!errors.sourceSystem}
                            helperText={errors.sourceSystem}
                            disabled={loading}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Trade Date"
                                value={trade.tradeDate}
                                onChange={(newValue) => setTrade({ ...trade, tradeDate: newValue })}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        error={!!errors.tradeDate}
                                        helperText={errors.tradeDate}
                                        disabled={loading}
                                    />
                                )}
                                disabled={loading}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 2, pt: 0 }}>
                <Button
                    onClick={handleClose}
                    disabled={loading}
                    sx={{ mr: 1 }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading}
                    sx={{
                        minWidth: 100,
                        bgcolor: '#00137F',
                        '&:hover': {
                            bgcolor: '#001AA9'
                        }
                    }}
                >
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        'Create Trade'
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateTradeDialog;
