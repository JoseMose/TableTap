import './App.css';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import('./Home'));
const QRCodeComponent = lazy(() => import('./QRCodeComponent'));
const QRCodeComponent2 = lazy(() => import('./QRCodeComponent 2'));
const FormComponent = lazy(() => import('./FormComponent'));
const LoginComponent = lazy(() => import('./LoginComponent'));
const KitchenComponent = lazy(() => import('./KitchenComponent'));
const CustomerOrderStatus = lazy(() => import('./CustomerOrderStatus'));
const CompletedOrdersComponent = lazy(() => import('./CompletedOrdersComponent'));

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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
          <Route path="/qrcode2/:tableNumber" element={<QRCodeComponent2 />} /> {/* Accessible to anyone */}
          <Route path="/form/:tableNumber" element={<FormComponent />} /> {/* Accessible to anyone */}
          <Route path="/kitchen" element={<PrivateRoute><KitchenComponent /></PrivateRoute>} />
          <Route path="/order-status/:tableNumber" element={<CustomerOrderStatus />} /> {/* Accessible to anyone */}
          <Route path="/completed-orders" element={<PrivateRoute><CompletedOrdersComponent /></PrivateRoute>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;