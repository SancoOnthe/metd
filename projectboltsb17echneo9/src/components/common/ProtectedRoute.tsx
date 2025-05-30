import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType: 'client' | 'provider' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, userType }) => {
  const { isAuthenticated, currentUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login\" replace />;
  }

  if (currentUser?.userType !== userType) {
    // Redirect to appropriate dashboard based on user type
    if (currentUser?.userType === 'client') {
      return <Navigate to="/client" replace />;
    } else if (currentUser?.userType === 'provider') {
      return <Navigate to="/provider\" replace />;
    } else if (currentUser?.userType === 'admin') {
      return <Navigate to="/admin" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
