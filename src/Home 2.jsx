import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import './App.css';

const Home = () => {
  const navigate = useNavigate();
  const [generatedNumbers, setGeneratedNumbers] = useState(new Set());
  const [nextTableNumber, setNextTableNumber] = useState(101);
  const [tableNumbers, setTableNumbers] = useState([]);
  const [showQRCodes, setShowQRCodes] = useState(false);

  useEffect(() => {
    // Generate initial table numbers 1-100
    const initialNumbers = Array.from({ length: 100 }, (_, i) => i + 1);
    setGeneratedNumbers(new Set(initialNumbers));
    setTableNumbers(initialNumbers);
  }, []);

  const handleShowQRCodes = () => {
    setShowQRCodes(true);
  };

  const handleGoBack = () => {
    setShowQRCodes(false);
  };

  const addTable = () => {
    setGeneratedNumbers(prevNumbers => new Set(prevNumbers).add(nextTableNumber));
    setTableNumbers(prevNumbers => [...prevNumbers, nextTableNumber]);
    setNextTableNumber(prevNumber => prevNumber + 1);
  };

  const goToKitchen = () => {
    navigate('/kitchen');
  };

  const goToCompletedOrders = () => {
    navigate('/completed-orders');
  };

  return (
    <div className="container">
      <h1>Welcome to the Home Page</h1>
      {!showQRCodes ? (
        <>
          <button onClick={handleShowQRCodes}>Go to QR Codes</button>
          <button onClick={goToKitchen} style={{ marginLeft: '10px' }}>Go to Kitchen</button>
          <button onClick={goToCompletedOrders} style={{ marginLeft: '10px' }}>Completed Orders</button>
        </>
      ) : (
        <>
          <button onClick={handleGoBack}>Go Back to Home Page</button>
          <button onClick={addTable} style={{ marginLeft: '10px' }}>Add a Table</button>
        </>
      )}
      {showQRCodes && (
        <div className="qr-codes">
          {tableNumbers.map(number => (
            <div key={number} className="qr-code">
              <h2>Table {number}</h2>
              <QRCode value={`http://localhost:3000/form/${number}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;