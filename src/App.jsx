import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import('./Home'));
const QRCodeComponent = lazy(() => import('./QRCodeComponent'));
const FormComponent = lazy(() => import('./FormComponent'));
const LoginComponent = lazy(() => import('./LoginComponent'));
const KitchenComponent = lazy(() => import('./KitchenComponent'));
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
          <Route path="/qrcode/:tableNumber" element={<QRCodeComponent />} /> {/* Accessible to anyone */}
          <Route path="/form/:tableNumber" element={<FormComponent />} /> {/* Accessible to anyone */}
          <Route path="/kitchen" element={<PrivateRoute><KitchenComponent /></PrivateRoute>} />
          <Route path="/order-status/:tableNumber" element={<CustomerOrderStatus />} /> {/* Accessible to anyone */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;