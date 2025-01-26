// filepath: /Users/josephesfandiari/Desktop/Table Tap/tabletap/src/KitchenComponent.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./App.css";

const firebaseFunctionsUrl = "https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/api"; // Replace with your actual Firebase Functions URL
const socket = io(firebaseFunctionsUrl);

const KitchenComponent = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${firebaseFunctionsUrl}/api/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();

    socket.on("order-updated", fetchOrders);

    return () => {
      socket.off("order-updated", fetchOrders);
    };
  }, []);

  const updateOrderStatus = async (tableNumber, status) => {
    try {
      await axios.put(`${firebaseFunctionsUrl}/api/update-order-status`, { tableNumber, status });
      // Fetch updated orders after status change
      const response = await axios.get(`${firebaseFunctionsUrl}/api/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
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
            <button onClick={() => updateOrderStatus(order.tableNumber, "In Progress")}>In Progress</button>
            <button onClick={() => updateOrderStatus(order.tableNumber, "On its way")}>On its way</button>
            <button onClick={() => updateOrderStatus(order.tableNumber, "Done")}>Done</button>
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default KitchenComponent;