import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3001');

const KitchenComponent = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();

    socket.on('order-updated', fetchOrders);

    return () => {
      socket.off('order-updated', fetchOrders);
    };
  }, []);

  const updateOrderStatus = async (tableNumber, status) => {
    try {
      await axios.put('http://localhost:3001/update-order-status', { tableNumber, status });
      // Fetch updated orders after status change
      const response = await axios.get('http://localhost:3001/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  return (
    <div className="container">
      <h1>Kitchen Orders</h1>
      {orders.length > 0 ? (
        orders.map(order => (
          <div key={order.tableNumber} className="order">
            <p>Table Number: {order.tableNumber}</p>
            <p>Name: {order.name}</p>
            <p>Order: {order.order}</p>
            <p>Status: {order.status}</p>
            <button onClick={() => updateOrderStatus(order.tableNumber, 'In Progress')}>In Progress</button>
            <button onClick={() => updateOrderStatus(order.tableNumber, 'On its way')}>On its way</button>
            <button onClick={() => updateOrderStatus(order.tableNumber, 'Done')}>Done</button>
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default KitchenComponent;