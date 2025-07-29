import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import DonorSignup from './pages/DonorSignup';
import CharitySignup from './pages/CharitySignup';
import DonorDashboard from './pages/DonorDashboard';
import CharityDashboard from './pages/CharityDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ApplyCharity from './pages/ApplyCharity';
import Footer from './components/Footer';

const parseToken = (token) => {
  if (!token || typeof token !== 'string') return null;
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }

    // Base64 decode without URI decoding
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64);
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Token parsing error:', error);
    localStorage.removeItem('token');
    return null;
  }
};

const App = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    role: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const verifyAuth = () => {
      const token = localStorage.getItem('token');
      const decoded = parseToken(token);
      
      if (decoded?.role) {
        setAuthState({
          role: decoded.role,
          isLoading: false,
          error: null
        });
        
        // If on login page but already authenticated, redirect to dashboard
        if (window.location.pathname === '/login') {
          navigate(`/${decoded.role}-dashboard`, { replace: true });
        }
      } else {
        setAuthState({
          role: null,
          isLoading: false,
          error: 'Invalid session'
        });
        
        // If trying to access protected route without auth, redirect to login
        const protectedRoutes = [
          '/donor-dashboard',
          '/charity-dashboard', 
          '/admin-dashboard'
        ];
        
        if (protectedRoutes.includes(window.location.pathname)) {
          navigate('/login', { 
            replace: true,
            state: { from: window.location.pathname }
          });
        }
      }
    };

    verifyAuth();
  }, [navigate]);

  if (authState.isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="app">
      <Navbar role={authState.role} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={!authState.role ? <Login /> : <Navigate to={`/${authState.role}-dashboard`} replace />} 
          />
          <Route path="/donor-signup" element={<DonorSignup />} />
          <Route path="/charity-signup" element={<CharitySignup />} />
          <Route path="/apply-charity" element={<ApplyCharity />} />
          
          <Route
            path="/donor-dashboard"
            element={
              authState.role === 'donor' ? 
                <DonorDashboard /> : 
                <Navigate to="/login" state={{ from: '/donor-dashboard' }} replace />
            }
          />
          
          <Route
            path="/charity-dashboard"
            element={
              authState.role === 'charity' ? 
                <CharityDashboard /> : 
                <Navigate to="/login" state={{ from: '/charity-dashboard' }} replace />
            }
          />
          
          <Route
            path="/admin-dashboard"
            element={
              authState.role === 'admin' ? 
                <AdminDashboard /> : 
                <Navigate to="/login" state={{ from: '/admin-dashboard' }} replace />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;