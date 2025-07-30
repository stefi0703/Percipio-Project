import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Box, Container, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import TradeList from './components/TradeList';
import InstrumentList from './components/InstrumentList';
import Reconciliation from './components/Reconciliation';
import AuditLogs from './components/AuditLogs';
import theme from './theme';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Trade Reconciliation
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            onClick={() => navigate('/trades')}
            sx={{ 
              borderBottom: location.pathname === '/trades' ? '2px solid white' : 'none',
              borderRadius: 0
            }}
          >
            Trades
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/instruments')}
            sx={{ 
              borderBottom: location.pathname === '/instruments' ? '2px solid white' : 'none',
              borderRadius: 0
            }}
          >
            Instruments
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/reconciliation')}
            sx={{ 
              borderBottom: location.pathname === '/reconciliation' ? '2px solid white' : 'none',
              borderRadius: 0
            }}
          >
            Reconciliation
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/audit-logs')}
            sx={{ 
              borderBottom: location.pathname === '/audit-logs' ? '2px solid white' : 'none',
              borderRadius: 0
            }}
          >
            Audit Logs
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navigation />
          <Container sx={{ mt: 4, mb: 4, flex: 1 }}>
            <Routes>
              <Route path="/trades" element={<TradeList />} />
              <Route path="/instruments" element={<InstrumentList />} />
              <Route path="/reconciliation" element={<Reconciliation />} />
              <Route path="/audit-logs" element={<AuditLogs />} />
              <Route path="/" element={<TradeList />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;