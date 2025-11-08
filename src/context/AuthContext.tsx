"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define a more detailed User type
// We use 'any' here for the dummy login, but in a real app
// you'd define every single field (name, hospitalName, etc.)
interface User {
  role: 'patient' | 'hospital';
  name: string; // Patient name OR Hospital name
  email: string; // Patient email OR Hospital email
  [key: string]: any; // Allow any other form data
}

// 2. Define the shape of the context data
interface AuthContextType {
  user: User | null; 
  isAuthenticated: boolean; 
  login: (userData: User) => void;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

  // Dummy login function
  const login = (userData: User) => {
    console.log("Dummy login with user data:", userData);
    setUser(userData);
  };

  // Dummy logout function
  const logout = () => {
    setUser(null);
  };

  return (
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