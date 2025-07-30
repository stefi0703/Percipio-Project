import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    IconButton,
    CircularProgress,
    Alert,
    Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CreateInstrumentDialog = ({ open, onClose, onSubmit, loading, error }) => {
    const [instrument, setInstrument] = useState({
        symbol: '',
        name: '',
        isin: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!instrument.symbol) newErrors.symbol = 'Symbol is required';
        if (!instrument.name) newErrors.name = 'Name is required';
        if (!instrument.isin) {
            newErrors.isin = 'ISIN is required';
        } else if (!/^[A-Z]{2}[A-Z0-9]{9}[0-9]$/.test(instrument.isin)) {
            newErrors.isin = 'Invalid ISIN format';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;
        onSubmit(instrument);
    };

    const handleClose = () => {
        setInstrument({
            symbol: '',
            name: '',
            isin: ''
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
                <Typography variant="h6">Create New Instrument</Typography>
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
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Symbol"
                            fullWidth
                            value={instrument.symbol}
                            onChange={(e) => setInstrument({ ...instrument, symbol: e.target.value.toUpperCase() })}
                            error={!!errors.symbol}
                            helperText={errors.symbol}
                            disabled={loading}
                            inputProps={{ style: { textTransform: 'uppercase' } }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="ISIN"
                            fullWidth
                            value={instrument.isin}
                            onChange={(e) => setInstrument({ ...instrument, isin: e.target.value.toUpperCase() })}
                            error={!!errors.isin}
                            helperText={errors.isin || 'Format: 2 letters + 9 alphanumeric + 1 check digit'}
                            disabled={loading}
                            inputProps={{ style: { textTransform: 'uppercase' } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            fullWidth
                            value={instrument.name}
                            onChange={(e) => setInstrument({ ...instrument, name: e.target.value })}
                            error={!!errors.name}
                            helperText={errors.name}
                            disabled={loading}
                        />
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
                        'Create Instrument'
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateInstrumentDialog;
