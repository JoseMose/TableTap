import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const FormComponent = () => {
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [order, setOrder] = useState('');
  const [orderStatus, setOrderStatus] = useState('No Order');
  const [existingOrderName, setExistingOrderName] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    const checkOrderStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/order-status/${tableNumber}`);
        setOrderStatus(response.data.status);
        setExistingOrderName(response.data.name || '');
        if (response.data.status === 'Completed') {
          setShowThankYou(true);
        }
      } catch (error) {
        console.error('Error checking order status:', error);
      }
    };

    checkOrderStatus();
  }, [tableNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = { tableNumber: parseInt(tableNumber), name, order };
    try {
      await axios.post('http://localhost:3001/submit-order', orderData);
      alert('Order submitted successfully');
      navigate(`/order-status/${tableNumber}`);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order');
    }
  };

  const handleCheckStatus = (e) => {
    e.preventDefault();
    if (existingOrderName && name.trim().toLowerCase() === existingOrderName.trim().toLowerCase()) {
      navigate(`/order-status/${tableNumber}`);
    } else {
      alert('Name does not match the existing order.');
    }
  };

  if (showThankYou) {
    return (
      <div className="container">
        <h1>Thank you for dining with us!</h1>
        <button onClick={() => {
          setShowThankYou(false);
          setOrderStatus('No Order');
          setExistingOrderName('');
          setName('');
          setOrder('');
        }}>OK</button>
      </div>
    );
  }

  if (orderStatus === 'Pending' || orderStatus === 'In Progress') {
    return (
      <div className="container">
        <h1>Form for Table {tableNumber}</h1>
        <p>An order has already been submitted for this table. You cannot submit another order until the current order is completed.</p>
        <p>Enter your name to check your status:</p>
        <form onSubmit={handleCheckStatus}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Form for Table {tableNumber}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Table Number:</label>
          <input type="text" value={tableNumber} readOnly />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Order:</label>
          <textarea value={order} onChange={(e) => setOrder(e.target.value)}></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;