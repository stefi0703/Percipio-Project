import React, { useState } from 'react';
import axios from 'axios';
import {
    Typography,
    Button,
    Paper,
    Box,
    Grid,
    CircularProgress,
    Card,
    CardContent,
    Alert,
    AlertTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Collapse,
    IconButton,
    Chip,
    Tooltip
} from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

const Reconciliation = () => {
    const [reconciliationRun, setReconciliationRun] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [differences, setDifferences] = useState([]);
    const [showDifferences, setShowDifferences] = useState(false);
    const [loadingDifferences, setLoadingDifferences] = useState(false);

    const startReconciliation = () => {
        setLoading(true);
        setError(null);
        setShowDifferences(false);
        setDifferences([]);
        axios.post('/api/reconciliation/start')
            .then(response => {
                setReconciliationRun(response.data);
            })
            .catch(error => {
                setError('Failed to start reconciliation process. Please try again.');
                console.error('Error starting reconciliation:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchDifferences = (runId) => {
        setLoadingDifferences(true);
        setError(null);
        axios.get(`/api/reconciliation/differences/${runId}`)
            .then(response => {
                setDifferences(response.data);
                setShowDifferences(true);
            })
            .catch(error => {
                setError('Failed to fetch reconciliation differences. Please try again.');
                console.error('Error fetching differences:', error);
            })
            .finally(() => {
                setLoadingDifferences(false);
            });
    };

    const toggleDifferences = () => {
        if (!showDifferences && reconciliationRun) {
            fetchDifferences(reconciliationRun.id);
        } else {
            setShowDifferences(false);
        }
    };

    return (
        <div>
            <Typography variant="h1" gutterBottom>
                Reconciliation
            </Typography>
            
            <Box mb={4}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={startReconciliation}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CompareArrowsIcon />}
                >
                    {loading ? 'Processing...' : 'Start Reconciliation'}
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            )}

            {reconciliationRun && (
                <>
                    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Typography variant="h2" gutterBottom>
                                Reconciliation Run Results
                            </Typography>
                            {reconciliationRun.unmatchedCount > 0 && (
                                <Tooltip title={showDifferences ? "Hide Differences" : "View Differences"}>
                                    <IconButton 
                                        onClick={toggleDifferences}
                                        color="primary"
                                        disabled={loadingDifferences}
                                    >
                                        {showDifferences ? <CloseIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            Run ID
                                        </Typography>
                                        <Typography variant="h5">
                                            {reconciliationRun.id}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            Status
                                        </Typography>
                                        <Typography variant="h5" sx={{
                                            color: reconciliationRun.status === 'COMPLETED' ? 'success.main' : 'info.main'
                                        }}>
                                            {reconciliationRun.status}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            Matched Trades
                                        </Typography>
                                        <Typography variant="h5" color="success.main">
                                            {reconciliationRun.matchedCount}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            Unmatched Trades
                                        </Typography>
                                        <Typography variant="h5" color="error.main">
                                            {reconciliationRun.unmatchedCount}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Collapse in={showDifferences} timeout="auto">
                        <Paper elevation={2} sx={{ p: 3 }}>
                            <Typography variant="h2" gutterBottom>
                                Reconciliation Differences
                            </Typography>
                            {loadingDifferences ? (
                                <Box display="flex" justifyContent="center" p={3}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                                <TableCell sx={{ color: 'white' }}>Trade ID</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Field</TableCell>
                                                <TableCell sx={{ color: 'white' }}>System A Value</TableCell>
                                                <TableCell sx={{ color: 'white' }}>System B Value</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {differences.map((diff, index) => (
                                                <TableRow 
                                                    key={`${diff.id}-${index}`}
                                                    sx={{ 
                                                        '&:nth-of-type(odd)': { backgroundColor: 'background.paper' },
                                                        '&:hover': { backgroundColor: 'action.hover' }
                                                    }}
                                                >
                                                    <TableCell>
                                                        <Chip 
                                                            label={diff.tradeId}
                                                            color="primary"
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                    <TableCell>{diff.fieldName}</TableCell>
                                                    <TableCell 
                                                        sx={{ 
                                                            backgroundColor: '#FFF4F4',
                                                            color: '#000000',
                                                            fontWeight: 500,
                                                            '& span': {
                                                                display: 'inline-block',
                                                                position: 'relative',
                                                                '&::after': {
                                                                    content: '""',
                                                                    position: 'absolute',
                                                                    bottom: -1,
                                                                    left: 0,
                                                                    right: 0,
                                                                    height: 2,
                                                                    backgroundColor: '#FF4444'
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <span>{diff.valueSystemA}</span>
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ 
                                                            backgroundColor: '#FFF4F4',
                                                            color: '#000000',
                                                            fontWeight: 500,
                                                            '& span': {
                                                                display: 'inline-block',
                                                                position: 'relative',
                                                                '&::after': {
                                                                    content: '""',
                                                                    position: 'absolute',
                                                                    bottom: -1,
                                                                    left: 0,
                                                                    right: 0,
                                                                    height: 2,
                                                                    backgroundColor: '#FF4444'
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <span>{diff.valueSystemB}</span>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Paper>
                    </Collapse>
                </>
            )}
        </div>
    );
};

export default Reconciliation;
