import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

type UserType = 'client' | 'provider' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  avatar?: string;
}

interface AuthContextType {
  currentUser: User | null;
  userType: UserType;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: { name: string; email: string; password: string; userType: 'client' | 'provider' }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Save user to local storage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in mock data
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      return true;
    }
    
    return false;
  };

  const register = async (userData: { name: string; email: string; password: string; userType: 'client' | 'provider' }): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      return false;
    }
    
    // Create new user (would normally be done by backend)
    const newUser = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      userType: userData.userType,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`,
    };
    
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    userType: currentUser?.userType || null,
    isAuthenticated: !!currentUser,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
