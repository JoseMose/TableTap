import React from "react";
import QRCode from "react-qr-code";
import { useParams } from 'react-router-dom';
import './App.css';

const QRCodeComponent = () => {
  const { tableNumber } = useParams();
  const url = `http://localhost:3000/form/${tableNumber}`;
  const statusUrl = `http://localhost:3000/order-status/${tableNumber}`;

  return (
    <div className="container">
      <h1>Scan the QR Code for Table {tableNumber}</h1>
      <QRCode value={url} />
      <p>Or check your order status <a href={statusUrl}>here</a>.</p>
    </div>
  );
};

export default QRCodeComponent;