const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"]
  }
});

let orders = [];
let completedOrders = [];

app.post('/submit-order', (req, res) => {
  const { tableNumber, name, order } = req.body;
  const existingOrder = orders.find(order => order.tableNumber === tableNumber && order.status !== 'Done');
  if (existingOrder && existingOrder.name !== name) {
    return res.status(400).send('An order has already been submitted for this table by a different name.');
  }
  const newOrder = { tableNumber, name, order, status: 'Pending' };
  orders.push(newOrder);
  io.emit('order-updated', orders);
  res.status(200).send('Order received');
});

app.post('/add-food', (req, res) => {
  const { tableNumber, additionalFood } = req.body;
  const order = orders.find(order => order.tableNumber === tableNumber && order.status !== 'Done');
  if (order) {
    order.order += `, ${additionalFood}`;
    io.emit('order-updated', orders);
    res.status(200).send('Food added to order');
  } else {
    res.status(404).send('Order not found or already done');
  }
});

app.get('/orders', (req, res) => {
  res.status(200).json(orders);
});

app.get('/completed-orders', (req, res) => {
  res.status(200).json(completedOrders);
});

app.get('/order-status/:tableNumber', (req, res) => {
  const tableNumber = parseInt(req.params.tableNumber);
  const order = orders.find(order => order.tableNumber === tableNumber);
  const completedOrder = completedOrders.find(order => order.tableNumber === tableNumber);
  if (order) {
    res.status(200).json({ status: order.status, name: order.name, order: order.order });
  } else if (completedOrder) {
    res.status(200).json({ status: completedOrder.status, name: completedOrder.name, order: completedOrder.order });
  } else {
    res.status(200).json({ status: 'No Order' });
  }
});

app.put('/update-order-status', (req, res) => {
  const { tableNumber, status } = req.body;
  const order = orders.find(order => order.tableNumber === tableNumber);
  if (order) {
    order.status = status;
    if (status === 'Done') {
      completedOrders.push(order);
      orders = orders.filter(order => order.tableNumber !== tableNumber);
    }
    io.emit('order-updated', orders);
    io.emit('completed-order-updated', completedOrders);
    res.status(200).send('Order status updated');
  } else {
    res.status(404).send('Order not found');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});