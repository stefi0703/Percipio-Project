import React, { useState } from 'react';
import axios from 'axios';

const Reconciliation = () => {
    const [reconciliationRun, setReconciliationRun] = useState(null);

    const startReconciliation = () => {
        axios.post('http://localhost:8080/api/reconciliation/start')
            .then(response => {
                setReconciliationRun(response.data);
            });
    };

    return (
        <div>
            <h1>Reconciliation</h1>
            <button onClick={startReconciliation}>Start Reconciliation</button>
            {reconciliationRun && (
                <div>
                    <h2>Reconciliation Run</h2>
                    <p>ID: {reconciliationRun.id}</p>
                    <p>Status: {reconciliationRun.status}</p>
                    <p>Matched: {reconciliationRun.matchedCount}</p>
                    <p>Unmatched: {reconciliationRun.unmatchedCount}</p>
                </div>
            )}
        </div>
    );
};

export default Reconciliation;
