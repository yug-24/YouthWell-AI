import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email?: string;
  isAnonymous: boolean;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('youthwell_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email?: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      isAnonymous: !email,
      createdAt: new Date(),
    };
    setUser(newUser);
    localStorage.setItem('youthwell_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('youthwell_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};