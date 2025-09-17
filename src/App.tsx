import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Tools from './pages/Tools';
import Journal from './pages/Journal';
import Progress from './pages/Progress';
import Resources from './pages/Resources';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="chat" element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } />
              <Route path="tools" element={
                <ProtectedRoute>
                  <Tools />
                </ProtectedRoute>
              } />
              <Route path="journal" element={
                <ProtectedRoute>
                  <Journal />
                </ProtectedRoute>
              } />
              <Route path="progress" element={
                <ProtectedRoute>
                  <Progress />
                </ProtectedRoute>
              } />
              <Route path="resources" element={
                <ProtectedRoute>
                  <Resources />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;