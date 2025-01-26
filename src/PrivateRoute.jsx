import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from './firebase';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const user = auth.currentUser;
  return user ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;