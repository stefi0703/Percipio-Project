import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TradeList = () => {
    const [trades, setTrades] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/trades')
            .then(response => {
                setTrades(response.data);
            });
    }, []);

    return (
        <div>
            <h1>Trades</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Trade ID</th>
                        <th>Instrument</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Source System</th>
                        <th>Trade Date</th>
                    </tr>
                </thead>
                <tbody>
                    {trades.map(trade => (
                        <tr key={trade.id}>
                            <td>{trade.id}</td>
                            <td>{trade.tradeId}</td>
                            <td>{trade.instrument}</td>
                            <td>{trade.price}</td>
                            <td>{trade.quantity}</td>
                            <td>{trade.sourceSystem}</td>
                            <td>{trade.tradeDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TradeList;
