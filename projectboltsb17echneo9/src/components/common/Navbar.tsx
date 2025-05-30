import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, ChevronDown, Bell, MessageSquare, User, LogOut } from 'lucide-react';

interface NavbarProps {
  userType: 'client' | 'provider' | 'admin';
}

const Navbar: React.FC<NavbarProps> = ({ userType }) => {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavLinks = () => {
    switch (userType) {
      case 'client':
        return [
          { name: 'Dashboard', path: '/client' },
          { name: 'Messages', path: '/client/messages' },
          { name: 'Profile', path: '/client/profile' },
        ];
      case 'provider':
        return [
          { name: 'Dashboard', path: '/provider' },
          { name: 'Services', path: '/provider/services' },
          { name: 'Bookings', path: '/provider/bookings' },
          { name: 'Messages', path: '/provider/messages' },
          { name: 'Metrics', path: '/provider/metrics' },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin' },
          { name: 'Users', path: '/admin/users' },
          { name: 'Categories', path: '/admin/categories' },
          { name: 'Reports', path: '/admin/reports' },
          { name: 'Metrics', path: '/admin/metrics' },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to={`/${userType}`} 
              className="flex-shrink-0 flex items-center"
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">SM</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">
                ServiceMarket
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === link.path
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center">
            <button 
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>
            <button 
              className="ml-4 p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Messages"
            >
              <MessageSquare size={20} />
            </button>

            <div className="ml-4 relative">
              <div>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center max-w-xs rounded-full text-sm focus:outline-none"
                  id="user-menu"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={currentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || 'User')}&background=random`}
                      alt={currentUser?.name}
                    />
                    <span className="ml-2 text-gray-700 text-sm hidden lg:block">
                      {currentUser?.name}
                    </span>
                    <ChevronDown className="ml-1" size={16} />
                  </div>
                </button>
              </div>

              {showDropdown && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link
                    to={`/${userType}/profile`}
                    className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => setShowDropdown(false)}
                  >
                    <User size={16} className="mr-2" />
                    Your Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={currentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || 'User')}&background=random`}
                  alt={currentUser?.name}
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {currentUser?.name}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {currentUser?.email}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                to={`/${userType}/profile`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Your Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
