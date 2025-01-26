const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({origin: true}));

// Endpoint to get order status by table number
app.get("/api/order-status/:tableNumber", async (req, res) => {
  const tableNumber = req.params.tableNumber;
  try {
    const orderDoc = await db.collection("orders").doc(tableNumber).get();
    if (!orderDoc.exists) {
      return res.status(404).send("Order not found");
    }
    res.json(orderDoc.data());
  } catch (error) {
    console.error("Error fetching order status:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to get all orders
app.get("/api/orders", async (req, res) => {
  try {
    const ordersSnapshot = await db.collection("orders").get();
    const orders = ordersSnapshot.docs.map((doc) => doc.data());
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to update order status
app.put("/api/update-order-status", async (req, res) => {
  const {tableNumber, status} = req.body;
  try {
    await db.collection("orders").doc(tableNumber.toString()).update({status});
    res.send("Order status updated");
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Export the Express app as a single Cloud Function
exports.api = functions.https.onRequest(app);
