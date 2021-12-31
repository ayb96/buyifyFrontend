import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.userSignin);

  return userInfo !== null ?
    children :
    <Navigate to="/" replace />

}

export default ProtectedRoute;