import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Papa from 'papaparse';
import './App.css';

const CompletedOrdersComponent2 = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [tableUsage, setTableUsage] = useState({});
  const [orderFrequency, setOrderFrequency] = useState({});
  const firebaseHostingUrl = "https://tabletap-27cd3.web.app"; // Replace with your actual Firebase Hosting URL

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const response = await axios.get(`${firebaseHostingUrl}/api/completed-orders`);
        setCompletedOrders(response.data);
        processStatistics(response.data);
      } catch (error) {
        console.error('Error fetching completed orders:', error);
      }
    };

    fetchCompletedOrders();
  }, []);

  const processStatistics = (orders) => {
    const tableUsageCount = {};
    const orderFrequencyCount = {};

    orders.forEach(order => {
      // Count table usage
      if (tableUsageCount[order.tableNumber]) {
        tableUsageCount[order.tableNumber]++;
      } else {
        tableUsageCount[order.tableNumber] = 1;
      }

      // Count order frequency
      const items = order.order.split(', ');
      items.forEach(item => {
        if (orderFrequencyCount[item]) {
          orderFrequencyCount[item]++;
        } else {
          orderFrequencyCount[item] = 1;
        }
      });
    });

    setTableUsage(tableUsageCount);
    setOrderFrequency(orderFrequencyCount);
  };

  const tableUsageData = {
    labels: Object.keys(tableUsage),
    datasets: [
      {
        label: 'Table Usage',
        data: Object.values(tableUsage),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const orderFrequencyData = {
    labels: Object.keys(orderFrequency),
    datasets: [
      {
        label: 'Order Frequency',
        data: Object.values(orderFrequency),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(completedOrders);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'completed_orders.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <h1>Completed Orders</h1>
      <button onClick={exportToCSV}>Export to CSV</button>
      <div className="chart-container">
        <h2>Table Usage</h2>
        <Bar data={tableUsageData} />
      </div>
      <div className="chart-container">
        <h2>Order Frequency</h2>
        <Bar data={orderFrequencyData} />
      </div>
      <div className="orders-list">
        {completedOrders.length > 0 ? (
          completedOrders.map(order => (
            <div key={order.tableNumber} className="order">
              <p>Table Number: {order.tableNumber}</p>
              <p>Name: {order.name}</p>
              <p>Order: {order.order}</p>
              <p>Status: {order.status}</p>
            </div>
          ))
        ) : (
          <p>No completed orders found</p>
        )}
      </div>
    </div>
  );
};

export default CompletedOrdersComponent2;s