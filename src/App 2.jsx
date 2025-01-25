import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import('./Home'));
const QRCodeComponent = lazy(() => import('./QRCodeComponent'));
const FormComponent = lazy(() => import('./FormComponent'));
const LoginComponent = lazy(() => import('./LoginComponent'));
const KitchenComponent = lazy(() => import('./KitchenComponent'));
const CustomerOrderStatus = lazy(() => import('./CustomerOrderStatus'));
const CompletedOrdersComponent = lazy(() => import('./CompletedOrdersComponent'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/qrcode/:tableNumber" element={<PrivateRoute><QRCodeComponent /></PrivateRoute>} />
          <Route path="/form/:tableNumber" element={<PrivateRoute><FormComponent /></PrivateRoute>} />
          <Route path="/kitchen" element={<PrivateRoute><KitchenComponent /></PrivateRoute>} />
          <Route path="/order-status/:tableNumber" element={<CustomerOrderStatus />} />
          <Route path="/completed-orders" element={<PrivateRoute><CompletedOrdersComponent /></PrivateRoute>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;