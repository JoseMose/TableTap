import React from "react";
import QRCode from "react-qr-code";
import { useParams } from 'react-router-dom';
import './App.css';

const QRCodeComponent2 = () => {
  const { tableNumber } = useParams();
  const firebaseHostingUrl = "https://tabletap-27cd3.web.app"; // Replace with your actual Firebase Hosting URL
  const url = `${firebaseHostingUrl}/form/${tableNumber}`;
  const statusUrl = `${firebaseHostingUrl}/order-status/${tableNumber}`;

  return (
    <div className="container">
      <h1>Scan the QR Code for Table {tableNumber}</h1>
      <QRCode value={url} />
      <p>Or check your order status <a href={statusUrl}>here</a>.</p>
    </div>
  );
};

export default QRCodeComponent2;