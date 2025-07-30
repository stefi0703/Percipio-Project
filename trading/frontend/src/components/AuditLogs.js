import React, { useState, useEffect } from 'react';
import {
    Typography,
    Paper,
    Box,
    CircularProgress,
    Tabs,
    Tab,
    IconButton,
    Collapse,
    Alert,
    Chip,
    Snackbar,
    Fade,
    FormControlLabel,
    Switch
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';
import { format } from 'date-fns';

const LogEntry = ({ log }) => {
    const [expanded, setExpanded] = useState(false);

    const getLevelColor = (level) => {
        switch (level.toUpperCase()) {
            case 'ERROR':
                return {
                    color: 'error',
                    icon: <ErrorOutlineIcon fontSize="small" />
                };
            case 'INFO':
            default:
                return {
                    color: 'info',
                    icon: <InfoOutlinedIcon fontSize="small" />
                };
        }
    };

    const levelInfo = getLevelColor(log.level);

    return (
        <Paper 
            elevation={2} 
            sx={{ 
                mb: 2, 
                overflow: 'hidden',
                '&:hover': {
                    backgroundColor: 'action.hover'
                },
                transition: 'background-color 0.2s'
            }}
        >
            <Box
                sx={{
                    p: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
                onClick={() => setExpanded(!expanded)}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                    <Chip
                        label={log.level}
                        color={levelInfo.color}
                        size="small"
                        icon={levelInfo.icon}
                        sx={{ minWidth: 90 }}
                    />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ 
                            fontFamily: 'monospace',
                            bgcolor: 'background.paper',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1
                        }}
                    >
                        {format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                    </Typography>
                    <Typography
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: expanded ? 'normal' : 'nowrap',
                            flex: 1
                        }}
                    >
                        {log.message}
                    </Typography>
                </Box>
                <IconButton 
                    size="small"
                    sx={{ ml: 1 }}
                >
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Box>
            <Collapse in={expanded}>
                <Box 
                    sx={{ 
                        p: 2, 
                        pt: 0,
                        backgroundColor: 'background.paper',
                        borderTop: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                        <strong>ID:</strong> {log.id}
                        <br />
                        <strong>Timestamp:</strong> {format(new Date(log.timestamp), 'PPpp')}
                        <br />
                        <strong>Level:</strong> {log.level}
                        <br />
                        <strong>Message:</strong> {log.message}
                    </Typography>
                </Box>
            </Collapse>
        </Paper>
    );
};

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState('all');
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
    const [autoRefresh, setAutoRefresh] = useState(false);

    const fetchLogs = React.useCallback(async () => {
        try {
            const endpoint = currentTab === 'errors' ? '/api/audit/errors/logs' : '/api/audit/logs';
            const response = await axios.get(endpoint);
            setLogs(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching logs:', err);
            setError('Failed to fetch logs. Please try again.');
            setSnackbar({
                open: true,
                message: 'Failed to fetch logs. Please try again.',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    }, [currentTab]);

    useEffect(() => {
        fetchLogs();
        let interval;
        if (autoRefresh) {
            interval = setInterval(fetchLogs, 30000); // Refresh every 30 seconds
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [fetchLogs, autoRefresh]);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
        setLoading(true);
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h1">
                    Audit Logs
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={autoRefresh}
                            onChange={(e) => setAutoRefresh(e.target.checked)}
                            color="primary"
                        />
                    }
                    label="Auto-refresh"
                />
            </Box>

            <Paper 
                sx={{ 
                    mb: 3,
                    backgroundColor: '#00137F',
                    color: 'white'
                }}
            >
                <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    textColor="inherit"
                    indicatorColor="secondary"
                    sx={{
                        '& .MuiTab-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&.Mui-selected': {
                                color: 'white'
                            }
                        }
                    }}
                >
                    <Tab label="All Logs" value="all" />
                    <Tab label="Error Logs" value="errors" />
                </Tabs>
            </Paper>

            {error ? (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            ) : (
                <Box>
                    {logs.map(log => (
                        <LogEntry key={log.id} log={log} />
                    ))}
                    {logs.length === 0 && (
                        <Paper sx={{ p: 3, textAlign: 'center' }}>
                            <Typography color="text.secondary">
                                No logs found
                            </Typography>
                        </Paper>
                    )}
                </Box>
            )}

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

export default AuditLogs;
