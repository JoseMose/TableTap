import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import './App.css';

const firebaseHostingUrl = "https://tabletap-27cd3.web.app"; // Replace with your actual Firebase Hosting URL
const socket = io(firebaseHostingUrl);

const CustomerOrderStatus = () => {
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [additionalFood, setAdditionalFood] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${firebaseHostingUrl}/api/order-status/${tableNumber}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();

    socket.on('order-updated', fetchOrder);
    socket.on('completed-order-updated', fetchOrder);

    return () => {
      socket.off('order-updated', fetchOrder);
      socket.off('completed-order-updated', fetchOrder);
    };
  }, [tableNumber]);

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${firebaseHostingUrl}/api/add-food`, { tableNumber: parseInt(tableNumber), additionalFood });
      alert('Food added to order');
      setAdditionalFood('');
      const response = await axios.get(`${firebaseHostingUrl}/api/order-status/${tableNumber}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error adding food to order:', error);
      alert('Failed to add food to order');
    }
  };

  const handleNewOrder = () => {
    navigate(`/form/${tableNumber}`);
  };

  if (order && order.status === 'Done') {
    return (
      <div className="container">
        <h1>Thank you for dining with us!</h1>
      </div>
    );
  }

  if (!order || order.status === 'No Order') {
    return (
      <div className="container">
        <h1>Welcome to my restaurant!</h1>
        <button onClick={handleNewOrder}>Order</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Order Status for Table {tableNumber}</h1>
      {order ? (
        <div>
          <p>Name: {order.name}</p>
          <p>Order: {order.order}</p>
          <p>Status: {order.status}</p>
          <form onSubmit={handleAddFood}>
            <div className="form-group">
              <label>Add More Food:</label>
              <input type="text" value={additionalFood} onChange={(e) => setAdditionalFood(e.target.value)} />
            </div>
            <button type="submit">Add Food</button>
          </form>
        </div>
      ) : (
        <p>No order found for this table</p>
      )}
    </div>
  );
};

export default CustomerOrderStatus;