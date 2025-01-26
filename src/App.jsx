import './App.css';
import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import('./Home'));
const Home2 = lazy(() => import('./Home2'));
const QRCodeComponent = lazy(() => import('./QRCodeComponent'));
const QRCodeComponent2 = lazy(() => import('./QRCodeComponent2'));
const FormComponent = lazy(() => import('./FormComponent'));
const FormComponent2 = lazy(() => import('./FormComponent2'));
const LoginComponent = lazy(() => import('./LoginComponent'));
const KitchenComponent = lazy(() => import('./KitchenComponent'));
const KitchenComponent2 = lazy(() => import('./KitchenComponent2'));
const CustomerOrderStatus = lazy(() => import('./CustomerOrderStatus'));

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      // Handle user state change
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/home2" element={<PrivateRoute><Home2 /></PrivateRoute>} />
          <Route path="/qrcode/:tableNumber" element={<QRCodeComponent />} /> {/* Accessible to anyone */}
          <Route path="/qrcode2/:tableNumber" element={<QRCodeComponent2 />} /> {/* Accessible to anyone */}
          <Route path="/form/:tableNumber" element={<FormComponent />} /> {/* Accessible to anyone */}
          <Route path="/form2/:tableNumber" element={<FormComponent2 />} /> {/* Accessible to anyone */}
          <Route path="/kitchen" element={<PrivateRoute><KitchenComponent /></PrivateRoute>} />
          <Route path="/kitchen2" element={<PrivateRoute><KitchenComponent2 /></PrivateRoute>} />
          <Route path="/order-status/:tableNumber" element={<CustomerOrderStatus />} /> {/* Accessible to anyone */}
          <Route path="/completed-orders2" element={<PrivateRoute><CompletedOrdersComponent /></PrivateRoute>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;