import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { MoveLeft } from 'lucide-react';

const NotFoundPage = () => {
  const { isAuthenticated, userType } = useAuth();

  const getDashboardLink = () => {
    if (!isAuthenticated) return '/login';
    
    switch (userType) {
      case 'client':
        return '/client';
      case 'provider':
        return '/provider';
      case 'admin':
        return '/admin';
      default:
        return '/login';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-extrabold text-blue-500">404</h1>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">Page Not Found</h2>
        <p className="mt-2 text-lg text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link to={getDashboardLink()}>
            <Button variant="primary" className="flex items-center justify-center mx-auto">
              <MoveLeft size={18} className="mr-2" />
              {isAuthenticated ? 'Back to Dashboard' : 'Back to Login'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
