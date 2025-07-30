import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstrumentList = () => {
    const [instruments, setInstruments] = useState([]);

    useEffect(() => {
        axios.get('/api/instruments')
            .then(response => {
                setInstruments(response.data);
            });
    }, []);

    return (
        <div>
            <h1>Instruments</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>ISIN</th>
                    </tr>
                </thead>
                <tbody>
                    {instruments.map(instrument => (
                        <tr key={instrument.id}>
                            <td>{instrument.id}</td>
                            <td>{instrument.symbol}</td>
                            <td>{instrument.name}</td>
                            <td>{instrument.isin}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InstrumentList;
