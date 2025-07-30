import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TradeList from './components/TradeList';
import InstrumentList from './components/InstrumentList';
import Reconciliation from './components/Reconciliation';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/trades">Trades</Link>
            </li>
            <li>
              <Link to="/instruments">Instruments</Link>
            </li>
            <li>
              <Link to="/reconciliation">Reconciliation</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/trades" element={<TradeList />} />
          <Route path="/instruments" element={<InstrumentList />} />
          <Route path="/reconciliation" element={<Reconciliation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;