import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ClientDashboard from './pages/client/ClientDashboard';
import ProviderDashboard from './pages/provider/ProviderDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProfilePage from './pages/client/ProfilePage';
import ProviderProfile from './pages/client/ProviderProfile';
import BookingPage from './pages/client/BookingPage';
import MessagesPage from './pages/client/MessagesPage';
import ProviderProfileEdit from './pages/provider/ProviderProfileEdit';
import ProviderServices from './pages/provider/ProviderServices';
import ProviderBookings from './pages/provider/ProviderBookings';
import ProviderMessages from './pages/provider/ProviderMessages';
import ProviderMetrics from './pages/provider/ProviderMetrics';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCategories from './pages/admin/AdminCategories';
import AdminReports from './pages/admin/AdminReports';
import AdminMetrics from './pages/admin/AdminMetrics';
import NotFoundPage from './pages/common/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Client Routes */}
          <Route path="/client" element={<ProtectedRoute userType="client"><ClientDashboard /></ProtectedRoute>} />
          <Route path="/client/profile" element={<ProtectedRoute userType="client"><ProfilePage /></ProtectedRoute>} />
          <Route path="/client/provider/:id" element={<ProtectedRoute userType="client"><ProviderProfile /></ProtectedRoute>} />
          <Route path="/client/booking/:id" element={<ProtectedRoute userType="client"><BookingPage /></ProtectedRoute>} />
          <Route path="/client/messages" element={<ProtectedRoute userType="client"><MessagesPage /></ProtectedRoute>} />
          
          {/* Provider Routes */}
          <Route path="/provider" element={<ProtectedRoute userType="provider"><ProviderDashboard /></ProtectedRoute>} />
          <Route path="/provider/profile" element={<ProtectedRoute userType="provider"><ProviderProfileEdit /></ProtectedRoute>} />
          <Route path="/provider/services" element={<ProtectedRoute userType="provider"><ProviderServices /></ProtectedRoute>} />
          <Route path="/provider/bookings" element={<ProtectedRoute userType="provider"><ProviderBookings /></ProtectedRoute>} />
          <Route path="/provider/messages" element={<ProtectedRoute userType="provider"><ProviderMessages /></ProtectedRoute>} />
          <Route path="/provider/metrics" element={<ProtectedRoute userType="provider"><ProviderMetrics /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute userType="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute userType="admin"><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute userType="admin"><AdminCategories /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute userType="admin"><AdminReports /></ProtectedRoute>} />
          <Route path="/admin/metrics" element={<ProtectedRoute userType="admin"><AdminMetrics /></ProtectedRoute>} />
          
          {/* Default Routes */}
          <Route path="/" element={<Navigate to="/login\" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
