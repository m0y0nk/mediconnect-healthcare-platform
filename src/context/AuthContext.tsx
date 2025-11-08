"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  role: 'customer' | 'hospital';
  name: string; 
}

// Define the shape of the context data
interface AuthContextType {
  user: User | null; 
  isAuthenticated: boolean; // This will be derived from 'user'
  login: (userData: User) => void;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // 1. We only need ONE state for the user
    const [user, setUser] = useState<User | null>(null);

  // Dummy login function
  const login = (userData: User) => {
    console.log("Dummy login with user data:", userData);
    // 2. Just set the user. 'isAuthenticated' will update automatically.
    setUser(userData);
  };

  // Dummy logout function
  const logout = () => {
    // 3. Just set the user to null.
    setUser(null);
  };

  return (
    // 4. 'isAuthenticated' is now correctly derived from '!!user'
    //    (!!user) is a trick that means "true if user is not null, false if it is"
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the auth context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};