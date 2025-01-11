"use client";

import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  email: string;
  type: 'client' | 'talent';
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Dummy credentials
const VALID_CREDENTIALS = {
  'client@test.com': { password: '1', type: 'client', name: 'John' },
  'user@test.com': { password: '1', type: 'talent', name: 'Sarah' }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    // Check if credentials match our dummy data
    const userCredentials = VALID_CREDENTIALS[email as keyof typeof VALID_CREDENTIALS];
    
    if (userCredentials && userCredentials.password === password) {
      const userData = {
        email,
        type: userCredentials.type,
        name: userCredentials.name
      } as User;
      
      setUser(userData);
      
      // Redirect based on user type
      router.push(`/dashboard/${userCredentials.type}`);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}