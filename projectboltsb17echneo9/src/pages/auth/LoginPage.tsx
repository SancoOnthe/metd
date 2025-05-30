import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import { LogIn, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<'client' | 'provider' | 'admin'>('client');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      const success = await login(email, password);
      
      if (success) {
        // Navigate based on user type
        if (userType === 'client') {
          navigate('/client');
        } else if (userType === 'provider') {
          navigate('/provider');
        } else if (userType === 'admin') {
          navigate('/admin');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Failed to log in');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (type: 'client' | 'provider' | 'admin') => {
    setLoading(true);
    try {
      let demoEmail = '';
      
      if (type === 'client') {
        demoEmail = 'client@example.com';
      } else if (type === 'provider') {
        demoEmail = 'provider@example.com';
      } else {
        demoEmail = 'admin@example.com';
      }
      
      const success = await login(demoEmail, 'password123');
      
      if (success) {
        navigate(`/${type}`);
      } else {
        setError('Demo login failed');
      }
    } catch (err) {
      setError('Failed to log in');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white text-xl font-bold">SM</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle size={20} className="mr-2" />
              <span>{error}</span>
            </div>
          )}

          <div className="mb-6">
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={() => setUserType('client')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  userType === 'client'
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Client
              </button>
              <button
                type="button"
                onClick={() => setUserType('provider')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  userType === 'provider'
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Provider
              </button>
              <button
                type="button"
                onClick={() => setUserType('admin')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  userType === 'admin'
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={loading}
                className="flex justify-center"
              >
                <LogIn className="mr-2" size={18} />
                Sign in
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with demo account</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button
                onClick={() => handleDemoLogin('client')}
                variant="outline"
                disabled={loading}
                className="w-full"
              >
                Client Demo
              </Button>
              <Button
                onClick={() => handleDemoLogin('provider')}
                variant="outline"
                disabled={loading}
                className="w-full"
              >
                Provider Demo
              </Button>
              <Button
                onClick={() => handleDemoLogin('admin')}
                variant="outline"
                disabled={loading}
                className="w-full"
              >
                Admin Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
