import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./App.css";

const firebaseFunctionsUrl = "https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/api"; // Replace with your actual Firebase Functions URL

const CustomerOrderStatus = () => {
  const { tableNumber } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${firebaseFunctionsUrl}/order-status/${tableNumber}`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [tableNumber]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Order Status for Table {tableNumber}</h1>
      <p><strong>Name:</strong> {orderDetails.name}</p>
      <p><strong>Order:</strong> {orderDetails.order}</p>
      <p><strong>Status:</strong> {orderDetails.status}</p>
    </div>
  );
};

export default CustomerOrderStatus;