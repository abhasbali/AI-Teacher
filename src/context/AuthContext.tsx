import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isSignedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signIn = async (email: string, password: string) => {
    // Here you would typically make an API call to your backend
    // This is just a mock implementation
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSignedIn(true);
    } catch (error) {
      throw new Error('Sign in failed');
    }
  };

  const signUp = async (email: string, password: string) => {
    // Here you would typically make an API call to your backend
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSignedIn(true);
    } catch (error) {
      throw new Error('Sign up failed');
    }
  };

  const signOut = () => {
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 